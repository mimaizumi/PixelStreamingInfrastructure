// Copyright Epic Games, Inc. All Rights Reserved.
import { AggregatedStats, I18n, LatencyInfo, Logger } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { StopIcon } from '../UI/StopIcon';
import { Application, VideoQPIndicatorConfig } from '../pixelstreamingfrontend-ui';
import { VideoQuality } from './VideoQuality';
import { VideoQpIndicator } from './VideoQpIndicator';
import { QuestionIcon } from './QuestionIcon';
import { RDesignCenter } from '../Overlay/RDesignCenter';
import { ExtraFlags } from './UIConfigurationTypes';

export class BottomPanel {
    _rootElement: HTMLElement;
    _leftSectionElement: HTMLElement;
    _rightSectionElement: HTMLElement;
    _settingIcon: HTMLElement;
    _stateIcon: HTMLElement;

    application: Application;
    stopIcon: StopIcon;
    videoQuality: VideoQuality;
    videoQpIndicator: VideoQpIndicator;
    questionIcon: QuestionIcon;
    rdesignCenter: RDesignCenter;

    constructor(application: Application, videoQpIndicatorConfig?: VideoQPIndicatorConfig) {
        this.application = application;

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

            Logger.RDesign('PixelStreamingMessage: Stop');
            window.parent.postMessage('PixelStreamingStop', '*');
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

            this._rightSectionElement.appendChild(this.settingIcon);
            this._rightSectionElement.appendChild(this.stateIcon);
            this._rightSectionElement.appendChild(this.rdesignCenter.rootElement);
            this._rightSectionElement.appendChild(this.questionIcon.rootElement);

            this.setHideControls(this.application.configUI.isCustomFlagEnabled(ExtraFlags.HideControls));

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

    public get settingIcon(): HTMLElement {
        if (!this._settingIcon) {
            this._settingIcon = document.createElement('div');
            this._settingIcon.id = 'settingsBtn';

            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-cog');
            icon.style.color = '#b0b0b0';
            this._settingIcon.appendChild(icon);

            this._settingIcon.addEventListener('click', () => {
                this.application.settingsClicked();
            });
        }

        return this._settingIcon;
    }

    public get stateIcon(): HTMLElement {
        if (!this._stateIcon) {
            this._stateIcon = document.createElement('div');
            this._stateIcon.id = 'stateBtn';

            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-info-circle');
            icon.style.color = '#b0b0b0';
            this._stateIcon.appendChild(icon);

            this._stateIcon.addEventListener('click', () => {
                this.application.statsClicked();
            });
        }

        return this._stateIcon;
    }

    setHideControls(isHidden: boolean) {
        Logger.RDesign('setHideControls: ' + isHidden);
        this._settingIcon.style.display = isHidden ? 'none' : 'block';
        this._stateIcon.style.display = isHidden ? 'none' : 'block';
    }
}
