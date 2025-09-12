// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Stop icon button that can be clicked.
 */
export class StopIcon {
    _rootElement: HTMLButtonElement;
    _stopIcon: HTMLElement;

    public onClick: () => void;

    /**
     * Get the button containing the stop icon.
     */
    public get rootElement(): HTMLButtonElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.id = 'stopBtn';
            this._rootElement.appendChild(this.stopIcon);

            this._rootElement.addEventListener('click', () => {
                this.onClick();
            });
        }
        return this._rootElement;
    }

    public get stopIcon(): HTMLElement {
        if (!this._stopIcon) {
            // Use an HTMLElement instead of SVGElement for FontAwesome
            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-stop');
            // Style the icon to be white
            icon.style.color = '#fff';

            // Store the wrapper as _stopIcon for compatibility
            this._stopIcon = icon;
        }
        return this._stopIcon;
    }

    public hide(): void {
        this.rootElement.classList.add('d-none');
    }

    public show(): void {
        this.rootElement.classList.remove('d-none');
    }
}
