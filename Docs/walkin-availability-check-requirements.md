# Walk-in Availability Check: PixelStreamingInfrastructure Implementation Requirements

> **Base branch**: `frontend` (UE5.6 base + custom implementation)

## Overview

With the introduction of the GCP Cloud Function API (`check-and-start`), add a **pre-connection availability check** to the PixelStreamingInfrastructure frontend. Before starting a stream, call the API and branch the UX based on GPU server availability.

**Goal**: Show "no servers available" instantly instead of waiting for a connection timeout.

> AWS streaming server is being decommissioned. This flow becomes the new GCP-based connection flow.

---

## Current Connection Flow

```
showRDesignSettingWarning()
  -> JWT verification (API.verifyJWT)
    -> showConnectOrAutoConnectOverlays()
      -> If AutoConnect:
          -> onWebRtcAutoConnect() -> showLoadingWithText()
          -> connect() -> WebSocket connection
      -> If manual:
          -> Show ConnectOverlay
            -> Click -> connect()
              -> WebSocket: ws://{ss} (SignallingServerUrl)
                -> listStreamers -> streamerList
                  -> WaitForStreamer polls for streamer
                    -> subscribe -> WebRTC -> Stream playback
```

**Key files**:
- `Frontend/library/src/PixelStreaming/PixelStreaming.ts` — `connect()`, `play()`, `setSignallingUrlBuilder()`
- `Frontend/library/src/WebRtcPlayer/WebRtcPlayerController.ts` — `connectToSignallingServer()`, WaitForStreamer polling
- `Frontend/library/src/Config/Config.ts` — `TextParameters.SignallingServerUrl` (`ss`), `TextParameters.JWT`, `TextParameters.Lang`
- `Frontend/ui-library/src/Application/Application.ts` — Overlay management, event handlers, JWT verification
- `Common/src/Util/I18n.ts` — Translation dictionary (en/ja)

**Custom overlays** (specific to `frontend` branch):
- `LoadingWithTextOverlay` — Spinner + text (used during connection wait states)
- `IconWithClickableTextOverlay` — Icon + clickable text (used for disconnect/error states, click triggers `reconnect()`)

**Connection URL**: `ss` parameter (default: `ws://{current_host}:{current_port}`)

---

## New Connection Flow

```
ConnectOverlay click (or AutoConnect)
  -> fetch(GET {API_ENDPOINT}/check-and-start)
  -> Branch on response:

    "starting":
      -> Show "Starting server..." UI
      -> Build signalling URL from vm_ip: ws://{vm_ip}:{port}
      -> Override ss via setSignallingUrlBuilder()
      -> connect() -> WebSocket connection attempt
      -> WaitForStreamer=true polls for streamer
        -> Streamer appears -> subscribe -> WebRTC -> Stream playback
      -> Timeout (wait_seconds) -> Show error

    "unavailable":
      -> Show "No servers available" message
      -> Do NOT attempt connection
      -> User can manually retry

    Error (500/504/network):
      -> Show error message
      -> User can manually retry
```

---

## API Specification (Cloud Function — separate repository)

### Endpoints

```
GET https://{REGION}-{PROJECT_ID}.cloudfunctions.net/check-and-start
GET https://{REGION}-{PROJECT_ID}.cloudfunctions.net/check-and-start?mode=check
```

[TBD] Exact endpoint URL will be provided by the Infra team after deployment.

### Responses

**VM starting** (HTTP 200):
```json
{
  "status": "starting",
  "vm_name": "gcp-ue5",
  "vm_ip": "34.153.198.47",
  "zone": "asia-northeast1-c",
  "machine_type": "g2-standard-8",
  "wait_seconds": 90,
  "search_step": 1
}
```

**No availability** (HTTP 200):
```json
{
  "status": "unavailable",
  "message": "No servers available",
  "steps_tried": 10
}
```

**Check only** (HTTP 200):
```json
{
  "status": "available",
  "best_option": {
    "zone": "asia-northeast1-c",
    "machine_type": "g2-standard-8"
  }
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (`starting`, `available`, or `unavailable`) |
| 500 | Internal API error (treat as transient failure) |
| 504 | Timeout (retry once) |

---

## Implementation Tasks

### Task 1: Insert API Call

**Change location**: `Application.ts:212`

```typescript
// Current (Application.ts:212)
this.connectOverlay.onAction(() => this.stream.connect());

// Changed to
this.connectOverlay.onAction(() => this.checkAvailabilityAndConnect());
```

AutoConnect flow also needs updating (`Application.ts:676-681`, `showConnectOrAutoConnectOverlays()`).

**`checkAvailabilityAndConnect()` flow**:

```typescript
async checkAvailabilityAndConnect() {
    const apiUrl = this.stream.config.getTextSettingValue(TextParameters.AvailabilityApiUrl);

    // No API URL configured -> fall back to direct connection
    if (!apiUrl) {
        this.stream.connect();
        return;
    }

    this.showLoadingWithText(I18n.t('availabilityChecking', this.lang));

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        switch (data.status) {
            case 'starting':
                this.handleStarting(data);
                break;
            case 'unavailable':
                this.handleUnavailable();
                break;
            default:
                this.handleAvailabilityError();
        }
    } catch (error) {
        this.handleAvailabilityError();
    }
}
```

**API endpoint configuration**: Add to `TextParameters`.

[TBD] API endpoint URL configuration approach. Proposed:
- Add `AvailabilityApiUrl` to `TextParameters` in `Config.ts`
- Pass via `initialSettings` (e.g., `{ AvailabilityApiUrl: 'https://...' }`)
- If URL is not set, skip API check and fall back to direct connection flow

### Task 2: Handle `starting` Response

**UI**: Show spinner + message via `showLoadingWithText()` (same pattern as `onWebRtcAutoConnect()`).

```typescript
handleStarting(data: { vm_ip: string; wait_seconds: number }) {
    this.showLoadingWithText(I18n.t('availabilityStarting', this.lang));

    // Build and override signalling URL
    const signalingUrl = `ws://${data.vm_ip}:${SIGNALLING_PORT}`;
    this.stream.setSignallingUrlBuilder(() => signalingUrl);

    // Start connection — WaitForStreamer auto-polls for streamer
    this.stream.connect();
}
```

[TBD] Signalling server port number. Original requirements say `800`, but the library default is `80`. Confirm correct port with Infra team.

[TBD] Protocol: `ws://` or `wss://` (SSL). Production may require `wss://`.

**Waiting for VM boot**: After `connect()`, leverage the existing `WaitForStreamer` mechanism.
- `WaitForStreamer=true` is already enabled by default on the `frontend` branch
- After WebSocket connects, `listStreamers` -> no streamer found -> retry at `StreamerAutoJoinInterval`
- `MaxReconnectAttempts` set to timeout equivalent (`wait_seconds / StreamerAutoJoinInterval`)
- Streamer appears -> auto subscribe -> WebRTC -> stream playback
- **Wait UI**: Existing `handleStreamerListMessage()` shows `I18n.t('waitingForStreamer')` (`Application.ts:852`)

**Timeout handling**: When `MaxReconnectAttempts` is reached, existing `handleStreamerListMessage()` shows `I18n.t('gaveUpWaitingForStreamer')` with `IconWithClickableTextOverlay` for retry (`Application.ts:859`). No additional implementation needed.

[TBD] Post-timeout behavior. Is current behavior (click to retry) sufficient, or should it re-call the API?

### Task 3: Handle `unavailable` Response

**UI**: Show message + click-to-retry via `showIconWithClickableText()`.

```typescript
handleUnavailable() {
    this.showIconWithClickableText(
        I18n.t('availabilityUnavailable', this.lang),
        ['fa-solid', 'fa-triangle-exclamation']
    );
}
```

Same pattern as existing `onDisconnect('serverUnreachable')`:
- Warning icon + message
- Click -> re-run `checkAvailabilityAndConnect()` (restart from API check, not `reconnect()`)
- No automatic retry

**Note**: The default `onAction` for `IconWithClickableTextOverlay` calls `reconnect()` (`Application.ts:209`). For `unavailable`, this must be replaced with `checkAvailabilityAndConnect()`.

### Task 4: Error Handling (500 / 504 / Network Failure)

**UI**: Show error message + click-to-retry via `showIconWithClickableText()`.

```typescript
handleAvailabilityError() {
    this.showIconWithClickableText(
        I18n.t('availabilityError', this.lang),
        ['fa-solid', 'fa-triangle-exclamation']
    );
}
```

- On 504: auto-retry once, then show error if still failing
- Click -> re-run `checkAvailabilityAndConnect()`

### Task 5 (Future): Pre-check Availability on Page Load

- Call `?mode=check` inside `showRDesignSettingWarning()` (after JWT verification)
- `available` -> Show ConnectOverlay as normal
- `unavailable` -> Show "no availability" message

Low priority. Implement after core flow is complete.

### Task 6: Authentication Header

Add authentication credentials to API requests. Can follow the existing `TextParameters.JWT` pattern.

[TBD] Authentication method. Infra team to decide:
1. API key in header (e.g., `X-API-Key: xxx`) — simplest
2. Reuse existing JWT token (`TextParameters.JWT`)
3. GCP IAM (service-to-service auth)

Until decided, implement without auth (or with a configurable header) so it can be swapped later.

---

## i18n

### Existing Mechanism

Custom i18n is already implemented on the `frontend` branch.

**File**: `Common/src/Util/I18n.ts`

```typescript
// Usage
I18n.t('keyName', this.lang)                    // basic
I18n.t('keyName', this.lang, { var: value })     // with template variables
```

- `I18n.t(key, locale, options)` — returns translated string for given key and locale
- Supports `{variable}` template substitution
- Two locales: `en` / `ja`
- `Application.ts` uses `this.lang` (from `TextParameters.Lang`) as the locale
- Exported from `@epicgames-ps/lib-pixelstreamingcommon-ue5.6`

### New Translation Keys

Add to the `translations` object in `Common/src/Util/I18n.ts`:

| Key | English (`en`) | Japanese (`ja`) |
|-----|----------------|-----------------|
| `availabilityChecking` | Checking server availability... | サーバーの空き状況を確認中... |
| `availabilityStarting` | Starting server... | サーバーを起動中です... |
| `availabilityUnavailable` | No servers available right now | 現在サーバーに空きがありません |
| `availabilityError` | Could not check server availability. Please try again | サーバーの確認中にエラーが発生しました。もう一度お試しください |
| `availabilityTimeout` | Server startup timed out | サーバーの起動がタイムアウトしました |

### Usage

Called in `Application.ts` following the existing pattern:

```typescript
this.showLoadingWithText(I18n.t('availabilityChecking', this.lang));
this.showLoadingWithText(I18n.t('availabilityStarting', this.lang));
this.showIconWithClickableText(I18n.t('availabilityUnavailable', this.lang), [...]);
this.showIconWithClickableText(I18n.t('availabilityError', this.lang), [...]);
```

---

## Implementation Layer

### Files to Change

| File | Change |
|------|--------|
| `Common/src/Util/I18n.ts` | Add 5 translation keys |
| `Frontend/library/src/Config/Config.ts` | Add `TextParameters.AvailabilityApiUrl` |
| `Frontend/ui-library/src/Application/Application.ts` | Add `checkAvailabilityAndConnect()` and handler methods, modify ConnectOverlay/AutoConnect flow |

### Approach

Follow existing patterns on the `frontend` branch: **consolidate all logic in `Application.ts`** (UI library).

Rationale:
- Existing business logic (JWT verification in `showRDesignSettingWarning()`, subscribeFailed redirect, `maxPlayerMessage` handling) is all in `Application.ts`
- Core library is generic — should not contain GCP-specific API checks
- `setSignallingUrlBuilder()` is already provided by Core library; Application layer just calls it

[TBD] Whether to put anything in Core library. Confirm the above approach is acceptable.

---

## Configuration Parameters (Proposed)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `AvailabilityApiUrl` | Text | (empty) | check-and-start API URL. Skip check when not set |
| `AvailabilityApiTimeout` | Numeric | 10000 | API call timeout (ms) |
| `ColdBootTimeout` | Numeric | 90 | VM startup timeout (seconds). Can be overridden by API `wait_seconds` |

[TBD] Auth-related parameters (API key etc.) to be added after auth method is decided.

---

## Timing

| Event | Duration |
|-------|----------|
| API call (check-and-start) | 1-5s |
| VM Cold Boot | ~90s |
| WebSocket + WebRTC establishment | 1-3s |
| Total (Connect -> Stream playback) | ~95s |

---

## [TBD] Open Items

| # | Item | Owner | Impact | Status |
|---|------|-------|--------|--------|
| 1 | Signalling server port number (80? 800? other?) | Infra | High | Open |
| 2 | Protocol (ws:// or wss://) | Infra | High | Open |
| 3 | API endpoint URL configuration/injection method | Design | Medium | Open |
| 4 | ~~i18n approach~~ | ~~App team~~ | ~~Medium~~ | **Resolved** — Use `I18n.t()` from `frontend` branch |
| 5 | Whether to put API check in Core library or Application layer | Design | Medium | Open |
| 6 | Authentication method (API key / JWT reuse / GCP IAM) | Infra | Medium | Open |
| 7 | Post-timeout behavior (error only / auto-retry API) | App team | Low | Open |
