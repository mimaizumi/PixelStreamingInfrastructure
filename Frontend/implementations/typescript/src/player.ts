// Copyright Epic Games, Inc. All Rights Reserved.

export * from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
export * from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
import { Config, PixelStreaming, Logger, LogLevel, TextParameters, Flags } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6';
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
		switch (response) {
			case "Stop":
				stream.stop("Streamer stopped the stream", false);
				break;
			case "Ready":
				const payload = { JWT: config.getTextSettingValue(TextParameters.JWT) };
        stream.emitUIInteraction(payload);
				break;
			default:
				break;
		}
	});

	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
		onHideControls: (isHidden) => PixelStreamingApplicationStyles.setHideControls(isHidden),
		hideControlsInFullscreen: true
	});
	document.body.appendChild(application.rootElement);

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
