// Copyright Epic Games, Inc. All Rights Reserved.

export * from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
export * from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
import { Config, PixelStreaming, Logger, LogLevel, API, TextParameters } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { Application, PixelStreamingApplicationStyle, UIElementCreationMode } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

// expose the pixel streaming object for hooking into. tests etc.
declare global {
    interface Window { pixelStreaming: PixelStreaming; }
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
		stream.disconnect();
	});

	window.addEventListener('beforeunload', () => {
		stream.disconnect();
		// send pause API
		const apiClient = new API({
				endpoint: `streaming/token/pause`,
				headers: { Authorization: `Token ${stream.config.getTextSettingValue(TextParameters.JWT)}` },
				method: 'POST'
		});
		apiClient.call().then((response) => {
				Logger.RDesign('Token paused - ' + JSON.stringify(response));
		});
	});

	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
		onHideControls: (isHidden) => PixelStreamingApplicationStyles.setHideControls(isHidden),
		hideControlsInFullscreen: true
	});
	document.body.appendChild(application.rootElement);

	window.pixelStreaming = stream;
}
