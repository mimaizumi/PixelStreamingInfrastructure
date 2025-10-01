// Copyright Epic Games, Inc. All Rights Reserved.
import {
    AggregatedStats,
    I18n,
    LatencyInfo,
    Logger,
    NumericParameters,
    TextParameters
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';
import { StopIcon } from '../UI/StopIcon';
import { Application, VideoQPIndicatorConfig } from '../pixelstreamingfrontend-ui';
import { VideoQuality } from './VideoQuality';
import { VideoQpIndicator } from './VideoQpIndicator';
import { QuestionIcon } from './QuestionIcon';
import { RDesignCenter } from '../Overlay/RDesignCenter';
import { ExtraFlags } from './UIConfigurationTypes';
import { OptimizedQualitySelector } from './OptimizedQualitySelector';

export class BottomPanel {
    _rootElement: HTMLElement;
    _leftSectionElement: HTMLElement;
    _rightSectionElement: HTMLElement;
    _settingIcon: HTMLElement;
    _stateIcon: HTMLElement;
    _downlinkBitrate: HTMLElement;
    _networkOptimizationQuality: HTMLElement;

    application: Application;
    stopIcon: StopIcon;
    videoQuality: VideoQuality;
    videoQpIndicator: VideoQpIndicator;
    questionIcon: QuestionIcon;
    rdesignCenter: RDesignCenter;
    optimizedQualitySelector: OptimizedQualitySelector;
    lang: string;

    constructor(application: Application, videoQpIndicatorConfig?: VideoQPIndicatorConfig) {
        this.application = application;
        this.lang = this.application.stream.config.getTextSettingValue(TextParameters.Lang);

        this.videoQuality = new VideoQuality();
        this.videoQpIndicator = new VideoQpIndicator(videoQpIndicatorConfig);
        this.videoQpIndicator.lang = this.lang;

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

        this.optimizedQualitySelector = new OptimizedQualitySelector(this.lang);
        this.optimizedQualitySelector.onQualityChanged = (quality) => {
            this.qualityChanged(quality);
        };

        this.application.stream.addEventListener('playStream', () => {
            this.showStreamInfo();
        });
        this.application.stream.addEventListener('streamStop', () => {
            this.hideStreamInfo();
        });
        this.application.stream.addEventListener('webRtcDisconnected', () => {
            this.hideStreamInfo();
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
            this._leftSectionElement.appendChild(this.downlinkBitrate);
            this._leftSectionElement.appendChild(this.networkOptimizationQuality);

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

        if (aggregatedStats.inboundVideoStats.bitrate) {
            const bitrate = aggregatedStats.inboundVideoStats.bitrate.toString();
            this.downlinkBitrate.textContent = `${I18n.t('goodput', this.lang)}: ${bitrate}kbps`;
        }
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

            if (this.application.settingsPanel) {
                this._settingIcon.addEventListener('click', () => {
                    this.application.settingsClicked();
                });
                this.application.settingsPanel.settingsCloseButton.onclick = () =>
                    this.application.settingsClicked();
                this.application.createCommandSettingButtons();
            }
        }

        return this._settingIcon;
    }

    public get downlinkBitrate(): HTMLElement {
        if (!this._downlinkBitrate) {
            this._downlinkBitrate = document.createElement('div');
            this._downlinkBitrate.id = 'downlinkBitrate';
            this._downlinkBitrate.style.color = 'white';
            this._downlinkBitrate.style.fontSize = '0.75rem';
            this._downlinkBitrate.style.display = 'none';
        }

        return this._downlinkBitrate;
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

    public get networkOptimizationQuality(): HTMLElement {
        if (!this._networkOptimizationQuality) {
            this._networkOptimizationQuality = document.createElement('div');
            this._networkOptimizationQuality.id = 'networkOptimizationQuality';
            this._networkOptimizationQuality.style.color = 'white';
            this._networkOptimizationQuality.style.fontSize = '0.75rem';
            this._networkOptimizationQuality.style.display = 'none';

            const label = document.createElement('div');
            label.id = 'networkOptimizationQualityLabel';
            label.textContent = I18n.t('chooseQuality', this.lang);
            this._networkOptimizationQuality.appendChild(label);

            this._networkOptimizationQuality.appendChild(this.optimizedQualitySelector.rootElement);
        }

        return this._networkOptimizationQuality;
    }

    setHideControls(isHidden: boolean) {
        Logger.RDesign('setHideControls: ' + isHidden);
        this._settingIcon.style.display = isHidden ? 'none' : 'block';
        this._stateIcon.style.display = isHidden ? 'none' : 'block';
    }

    showStreamInfo() {
        this.videoQuality.show();
        this.stopIcon.show();
        this.downlinkBitrate.style.display = 'block';
        this.networkOptimizationQuality.style.display = 'flex';
    }

    hideStreamInfo() {
        this.stopIcon.hide();
        this.videoQuality.hide();
        this.downlinkBitrate.style.display = 'none';
        this.networkOptimizationQuality.style.display = 'none';
    }

    qualityChanged(quality: string) {
        switch (quality) {
            case 'fullHD':
                this.application.stream.emitConsoleCommand('r.setres 1920x1080');
                this.application.stream.emitConsoleCommand('t.maxfps 60');
                this.application.stream.emitConsoleCommand('r.ScreenPercentage 100');
                this.application.stream.config.setNumericSetting(NumericParameters.WebRTCFPS, 60);
                break;
            case 'standard':
                this.application.stream.emitConsoleCommand('r.setres 1280x720');
                this.application.stream.emitConsoleCommand('t.maxfps 30');
                this.application.stream.emitConsoleCommand('r.ScreenPercentage 95');
                this.application.stream.config.setNumericSetting(NumericParameters.WebRTCFPS, 30);
                break;
            case 'lowData':
                this.application.stream.emitConsoleCommand('r.setres 960x540');
                this.application.stream.emitConsoleCommand('t.maxfps 27');
                this.application.stream.emitConsoleCommand('r.ScreenPercentage 95');
                this.application.stream.config.setNumericSetting(NumericParameters.WebRTCFPS, 27);
                break;
            case 'ultraLowData':
                this.application.stream.emitConsoleCommand('r.setres 640x360');
                this.application.stream.emitConsoleCommand('t.maxfps 24');
                this.application.stream.emitConsoleCommand('r.ScreenPercentage 90');
                this.application.stream.config.setNumericSetting(NumericParameters.WebRTCFPS, 24);
                break;
        }
        this.application.stream.config.setNumericSetting(NumericParameters.WebRTCMinBitrate, 200);
        this.application.stream.config.setNumericSetting(NumericParameters.WebRTCMaxBitrate, 10000);
        this.application.stream.config.setNumericSetting(NumericParameters.CompatQualityMin, 1);
        this.application.stream.config.setNumericSetting(NumericParameters.CompatQualityMax, 100);
    }
}
