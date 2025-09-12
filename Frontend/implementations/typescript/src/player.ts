// Copyright Epic Games, Inc. All Rights Reserved.

export * from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
export * from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
import { Config, PixelStreaming, Logger, LogLevel, TextParameters, Flags } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { Application, BottomPanel, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

// expose the pixel streaming object for hooking into. tests etc.
declare global {
    interface Window { pixelStreaming: PixelStreaming; rdesign: any; }
}

document.body.onload = function() {
  Logger.InitLogging(LogLevel.RDesign, false);
	Logger.RDesign("Welcome! Pixel Streaming");

	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create the main Pixel Streaming object for interfacing with the web-API of Pixel Streaming
	const stream = new PixelStreaming(config);

	stream.addResponseEventListener("RDesign_Message", (response: string) => {
		Logger.RDesign("Response received! " + response);
		let event = response
		try {
			event = JSON.parse(response).event
		} catch (error) {
			// Do nothing
		}
		switch (event) {
			case "Stop":
				let json = JSON.parse(response)
				stream.stop(json.error_message, false);
				break;
			case "Ready":
				const payload = { JWT: config.getTextSettingValue(TextParameters.JWT) };
				let result = stream.emitUIInteraction(payload);
				Logger.RDesign('Send JWT Result: ' + result);
				if (!result) {
					Logger.RDesign('wait for 2s')
					setTimeout(() => {
						result = stream.emitUIInteraction(payload);
						Logger.RDesign('Send JWT Result: ' + result);
					}, 2000)
				}
				break;
			case "Enable_AFK":
				Logger.RDesign('Enable AFK')
				config.setFlagEnabled(Flags.AFKDetection, true);
				break;
			case "Disable_AFK":
				Logger.RDesign('Disable AFK')
				config.setFlagEnabled(Flags.AFKDetection, false);
				break;
			default:
				break;
		}
	});

	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
		onHideControls: (isHidden) => PixelStreamingApplicationStyles.setHideControls(isHidden),
		hideControlsInFullscreen: true,
		videoQpIndicatorConfig: { disableIndicator: true }
	});
	document.body.appendChild(application.rootElement);

	const bottomPanel = new BottomPanel(application);
	document.body.appendChild(bottomPanel.rootElement);

	window.pixelStreaming = stream;
	// helper
	window.rdesign = {
		emitReady: () => {
			const payload = { JWT: config.getTextSettingValue(TextParameters.JWT) };
			Logger.RDesign('EmitUIInteraction: ' + JSON.stringify(payload));
			const result = stream.emitUIInteraction(payload);
			Logger.RDesign('EmitUIInteraction Result: ' + result);
		},
		locale: () => new URLSearchParams(window.location.search).get('lang') || 'ja'
	}
}
