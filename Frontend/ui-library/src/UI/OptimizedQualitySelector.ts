// Copyright Epic Games, Inc. All Rights Reserved.
export class OptimizedQualitySelector {
    _rootElement: HTMLElement;
    _currentQuality: string;

    onQualityChanged: (quality: string) => void;

    constructor() {
        this._currentQuality = 'Full HD';
    }

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'optimizedQualitySelector';

            const selector = document.createElement('div');
            selector.id = 'optimizedQualitySelector';

            const currentQuality = document.createElement('div');
            currentQuality.id = 'optimizedQualitySelectorCurrentQuality';

            const currentTextLabel = document.createElement('span');
            currentTextLabel.textContent = this._currentQuality;
            currentQuality.appendChild(currentTextLabel);

            const icon = document.createElement('i');
            icon.style.marginLeft = '5px';
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

            ['Full HD', 'High Detail', 'Balanced', 'Low Data'].forEach((quality) => {
                const option = document.createElement('div');
                option.className = 'optimizedQualitySelectorQualityOption';
                option.textContent = quality;
                option.addEventListener('click', () => {
                    this.onQualityChanged(quality);
                    this._currentQuality = quality;
                    const qualityOptions = document.getElementById('optimizedQualitySelectorQualityOptions');
                    currentTextLabel.textContent = quality;
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
