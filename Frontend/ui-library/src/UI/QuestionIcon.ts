// Copyright Epic Games, Inc. All Rights Reserved.
export class QuestionIcon {
    _rootElement: HTMLElement;
    _questionIcon: HTMLElement;

    onClick: () => void;

    /**
     * Get the button containing the stop icon.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'questionBtn';
            this._rootElement.appendChild(this.questionIcon);

            this._rootElement.addEventListener('click', () => {
                this.onClick();
            });
        }
        return this._rootElement;
    }

    public get questionIcon(): HTMLElement {
        if (!this._questionIcon) {
            // Use an HTMLElement instead of SVGElement for FontAwesome
            const icon = document.createElement('i');
            icon.classList.add('fa-regular', 'fa-circle-question');
            // Style the icon to be white
            icon.style.color = '#b0b0b0';

            // Store the wrapper as _stopIcon for compatibility
            this._questionIcon = icon;
        }
        return this._questionIcon;
    }
}
