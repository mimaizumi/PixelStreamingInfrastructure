// Copyright Epic Games, Inc. All Rights Reserved.
import { I18n } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';

export class OptimizedQualitySelector {
    _rootElement: HTMLElement;
    _currentQuality: string;

    lang: string;

    onQualityChanged: (quality: string) => void;

    constructor(lang: string) {
        this._currentQuality = 'fullHD';
        this.lang = lang;
    }

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'optimizedQualitySelector';

            const selector = document.createElement('div');
            selector.id = 'optimizedQualitySelector';

            const currentQuality = document.createElement('div');
            currentQuality.id = 'optimizedQualitySelectorCurrentQuality';

            const currentTextLabel = document.createElement('div');
            currentTextLabel.textContent = I18n.t(this._currentQuality, this.lang);
            currentQuality.appendChild(currentTextLabel);

            const icon = document.createElement('i');
            icon.style.marginTop = '3px';
            icon.classList.add('fa-solid', 'fa-chevron-up');
            currentQuality.appendChild(icon);
            currentQuality.addEventListener('click', () => {
                const qualityOptions = document.getElementById('optimizedQualitySelectorQualityOptions');
                if (qualityOptions) {
                    qualityOptions.style.display = qualityOptions.style.display === 'none' ? 'block' : 'none';
                }
            });

            const qualityOptions = document.createElement('div');
            qualityOptions.id = 'optimizedQualitySelectorQualityOptions';
            qualityOptions.style.display = 'none';

            ['fullHD', 'standard', 'lowData', 'ultraLowData'].forEach((quality) => {
                const option = document.createElement('div');
                option.className = 'optimizedQualitySelectorQualityOption';
                option.textContent = I18n.t(quality, this.lang);
                option.addEventListener('click', () => {
                    this.onQualityChanged(quality);
                    this._currentQuality = quality;
                    const qualityOptions = document.getElementById('optimizedQualitySelectorQualityOptions');
                    currentTextLabel.textContent = I18n.t(this._currentQuality, this.lang);
                    if (qualityOptions) {
                        qualityOptions.style.display = 'none';
                    }
                });
                qualityOptions.appendChild(option);
            });

            selector.appendChild(currentQuality);
            selector.appendChild(qualityOptions);

            this._rootElement.appendChild(selector);
        }
        return this._rootElement;
    }
}
