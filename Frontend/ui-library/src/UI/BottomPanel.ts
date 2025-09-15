// Copyright Epic Games, Inc. All Rights Reserved.
import { AggregatedStats, I18n, LatencyInfo } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { StopIcon } from '../UI/StopIcon';
import { Application, VideoQPIndicatorConfig } from '../pixelstreamingfrontend-ui';
import { VideoQuality } from './VideoQuality';
import { VideoQpIndicator } from './VideoQpIndicator';
import { QuestionIcon } from './QuestionIcon';
import { RDesignCenter } from '../Overlay/RDesignCenter';
import {
    SettingsPanelConfiguration,
    StatsPanelConfiguration,
    UIElementConfig,
    UIElementCreationMode
} from './UIConfigurationTypes';
import { Controls, ControlsUIConfiguration } from './Controls';
import { FullScreenIconBase, FullScreenIconExternal } from './FullscreenIcon';
import { LabelledButton } from './LabelledButton';

interface ControlOptions {
    /** By default, a settings panel and associate visibility toggle button will be made.
     * If needed, this behaviour can be configured. */
    settingsPanelConfig?: SettingsPanelConfiguration;
    /** By default, a stats panel and associate visibility toggle button will be made.
     * If needed, this behaviour can be configured. */
    statsPanelConfig?: StatsPanelConfiguration;
    /** If needed, the full screen button can be external or disabled. */
    fullScreenControlsConfig?: UIElementConfig;
    /** If needed, XR button can be external or disabled. */
    xrControlsConfig?: UIElementConfig;
    /** Configuration of the video QP indicator. */
    videoQpIndicatorConfig?: VideoQPIndicatorConfig;
    /** Hide the controls in fullscreen mode */
    hideControlsInFullscreen?: boolean;
}

export class BottomPanel {
    _rootElement: HTMLElement;
    _leftSectionElement: HTMLElement;
    _rightSectionElement: HTMLElement;

    application: Application;
    stopIcon: StopIcon;
    videoQuality: VideoQuality;
    videoQpIndicator: VideoQpIndicator;
    questionIcon: QuestionIcon;
    rdesignCenter: RDesignCenter;
    controlOptions: ControlOptions;
    controls: Controls;

    constructor(
        application: Application,
        videoQpIndicatorConfig?: VideoQPIndicatorConfig,
        controlOptions?: ControlOptions
    ) {
        this.application = application;
        this.controlOptions = controlOptions;

        // this.createButtons();

        this.videoQuality = new VideoQuality();
        this.videoQpIndicator = new VideoQpIndicator(videoQpIndicatorConfig);

        this.questionIcon = new QuestionIcon();
        this.questionIcon.onClick = () => {
            if (this.application.guidePanel.visible()) {
                this.application.guidePanel.hide();
            } else {
                this.application.guidePanel.show();
            }
        };

        this.rdesignCenter = new RDesignCenter();

        this.stopIcon = new StopIcon();
        this.stopIcon.hide();
        this.stopIcon.onClick = () => {
            this.application.stream.stop('Player stopped the stream', true);
            this.application.iconWithClickableTextOverlay.update(I18n.t('clickToResume'));
        };

        this.application.stream.addEventListener('playStream', () => {
            this.videoQuality.show();
            this.stopIcon.show();
        });
        this.application.stream.addEventListener('streamStop', () => {
            this.stopIcon.hide();
            this.videoQuality.hide();
        });
        this.application.stream.addEventListener('webRtcDisconnected', () => {
            this.stopIcon.hide();
            this.videoQuality.hide();
        });
        this.application.stream.addEventListener('statsReceived', ({ data: { aggregatedStats } }) => {
            this.onStatsReceived(aggregatedStats);
        });
        this.application.stream.addEventListener('afkTimedOut', () => {
            this.videoQuality.hide();
        });
        this.application.stream.addEventListener('videoEncoderAvgQP', ({ data: { avgQP } }) =>
            this.onVideoEncoderAvgQP(avgQP)
        );
        this.application.stream.addEventListener('latencyCalculated', ({ data: { latencyInfo } }) =>
            this.onLatencyUpdate(latencyInfo)
        );
    }

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'bottomPanel';

            this._leftSectionElement = document.createElement('div');
            this._leftSectionElement.id = 'bottomPanelLeftSection';

            this._rightSectionElement = document.createElement('div');
            this._rightSectionElement.id = 'bottomPanelRightSection';

            this._leftSectionElement.appendChild(this.stopIcon.rootElement);
            this._leftSectionElement.appendChild(this.videoQpIndicator.rootElement);
            this._leftSectionElement.appendChild(this.videoQuality.rootElement);

            // this._rightSectionElement.appendChild(this.controls.rootElement);
            this._rightSectionElement.appendChild(this.rdesignCenter.rootElement);
            this._rightSectionElement.appendChild(this.questionIcon.rootElement);

            this._rootElement.appendChild(this._leftSectionElement);
            this._rootElement.appendChild(this._rightSectionElement);
        }

        return this._rootElement;
    }

    onStatsReceived(aggregatedStats: AggregatedStats) {
        let videoQuantityResult = '';
        let frameRate = '';
        const resolution =
            aggregatedStats.inboundVideoStats.frameWidth !== undefined &&
            aggregatedStats.inboundVideoStats.frameWidth > 0 &&
            aggregatedStats.inboundVideoStats.frameHeight !== undefined &&
            aggregatedStats.inboundVideoStats.frameHeight > 0
                ? aggregatedStats.inboundVideoStats.frameWidth +
                  'x' +
                  aggregatedStats.inboundVideoStats.frameHeight
                : 'Chrome only';
        videoQuantityResult = this.videoQuality.displayResolution(resolution);
        if (aggregatedStats.inboundVideoStats.framesPerSecond !== undefined) {
            frameRate = aggregatedStats.inboundVideoStats.framesPerSecond.toString() + 'fps';
            videoQuantityResult += ' - ' + frameRate;
        }
        if (aggregatedStats.inboundVideoStats.bitrate !== undefined) {
            const bitrate = aggregatedStats.inboundVideoStats.bitrate.toString();
            this.rdesignCenter.updateStats(resolution, frameRate, bitrate);
        }
        this.videoQuality.updateQualityText(videoQuantityResult);
    }

    onVideoEncoderAvgQP(QP: number) {
        if (this.videoQpIndicator) {
            this.videoQpIndicator.updateQpTooltip(QP);
        }
    }

    onLatencyUpdate(latencyInfo: LatencyInfo) {
        this.rdesignCenter.updateLatency(Math.ceil(latencyInfo.averageE2ELatency).toString() + 'ms');
    }

    public createButtons() {
        const isIphone = /iPhone/.test(navigator.userAgent);
        const isIpad =
            /iPad/.test(navigator.userAgent) ||
            (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);
        const isSafari =
            navigator.vendor &&
            navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('CriOS') == -1 &&
            navigator.userAgent.indexOf('FxiOS') == -1;

        // In some cases we want to disable fullscreen button if it is not explicitly requested:

        // IPhone does not support fullscreen API as at 28th July 2024 (see: https://caniuse.com/fullscreen) so if
        // we are on IPhone and user has not specified explicitly configured UI config for
        // fullscreen button then we should disable this button as it doesn't work.

        // Additionally iPad on non-Safari browsers doesn't really allow touch inputs and fullscreen video at the same time.
        // If you do this the video gets dragged off back to normal non-fullscreen video and then the video is paused.
        // See: https://github.com/EpicGamesExt/PixelStreamingInfrastructure/issues/219
        const disableFullscreenButton = isIphone || (!isSafari && isIpad);

        if (this.controlOptions.fullScreenControlsConfig === undefined && disableFullscreenButton) {
            this.controlOptions.fullScreenControlsConfig = { creationMode: UIElementCreationMode.Disable };
        }

        const controlsUIConfig: ControlsUIConfiguration = {
            statsButtonType: this.controlOptions.statsPanelConfig
                ? this.controlOptions.statsPanelConfig.visibilityButtonConfig
                : undefined,
            settingsButtonType: this.controlOptions.settingsPanelConfig
                ? this.controlOptions.settingsPanelConfig.visibilityButtonConfig
                : undefined,
            fullscreenButtonType: this.controlOptions.fullScreenControlsConfig,
            xrIconType: this.controlOptions.xrControlsConfig,
            hideControlsInFullscreen: this.controlOptions.hideControlsInFullscreen
        };

        // Setup controls
        this.controls = new Controls(controlsUIConfig);

        // When we fullscreen we want this element to be the root
        const fullScreenButton: FullScreenIconBase | undefined =
            // Depending on if we're creating an internal button, or using an external one
            !!this.controlOptions.fullScreenControlsConfig &&
            this.controlOptions.fullScreenControlsConfig.creationMode ===
                UIElementCreationMode.UseCustomElement
                ? // Either create a fullscreen class based on the external button
                  new FullScreenIconExternal(this.controlOptions.fullScreenControlsConfig.customElement)
                : // Or use the one created by the Controls initializer earlier
                  this.controls.fullscreenIcon;
        if (fullScreenButton) {
            fullScreenButton.fullscreenElement = /iPad|iPhone|iPod/.test(navigator.userAgent)
                ? this.application.stream.videoElementParent.getElementsByTagName('video')[0]
                : this.rootElement;
        }

        // Add settings button to controls
        const settingsButton: HTMLElement | undefined = this.controls.settingsIcon
            ? this.controls.settingsIcon.rootElement
            : this.controlOptions.settingsPanelConfig.visibilityButtonConfig.customElement;
        if (settingsButton) settingsButton.onclick = () => this.application.settingsClicked();
        if (this.application.settingsPanel)
            this.application.settingsPanel.settingsCloseButton.onclick = () =>
                this.application.settingsClicked();

        // Add WebXR button to controls
        const xrButton: HTMLElement | undefined = this.controls.xrIcon
            ? this.controls.xrIcon.rootElement
            : this.controlOptions.xrControlsConfig.creationMode === UIElementCreationMode.UseCustomElement
              ? this.controlOptions.xrControlsConfig.customElement
              : undefined;
        if (xrButton) xrButton.onclick = () => this.application.stream.toggleXR();

        // setup the stats/info button
        const statsButton: HTMLElement | undefined = this.controls.statsIcon
            ? this.controls.statsIcon.rootElement
            : this.controlOptions.statsPanelConfig.visibilityButtonConfig.customElement;
        if (statsButton) statsButton.onclick = () => this.application.statsClicked();

        if (this.application.statsPanel) {
            this.application.statsPanel.statsCloseButton.onclick = () => this.application.statsClicked();
        }

        // Add command buttons (if we have somewhere to add them to)
        if (this.application.settingsPanel) {
            // Add button for toggle fps
            const showFPSButton = new LabelledButton('Show FPS', 'Toggle');
            showFPSButton.addOnClickListener(() => {
                this.application.stream.requestShowFps();
            });

            // Add button for restart stream
            const restartStreamButton = new LabelledButton('Restart Stream', 'Restart');
            restartStreamButton.addOnClickListener(() => {
                this.application.stream.reconnect();
            });

            // Add button for request keyframe
            const requestKeyframeButton = new LabelledButton('Request keyframe', 'Request');
            requestKeyframeButton.addOnClickListener(() => {
                this.application.stream.requestIframe();
            });

            const commandsSectionElem = this.application.configUI.buildSectionWithHeading(
                this.application.settingsPanel.settingsContentElement,
                'Commands'
            );
            commandsSectionElem.appendChild(showFPSButton.rootElement);
            commandsSectionElem.appendChild(requestKeyframeButton.rootElement);
            commandsSectionElem.appendChild(restartStreamButton.rootElement);
        }
    }
}
