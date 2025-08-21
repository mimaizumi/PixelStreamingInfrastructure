// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Stop icon button that can be clicked.
 */
export class StopIcon {
    _rootElement: HTMLButtonElement;
    _stopIcon: HTMLElement;
    _tooltipText: HTMLElement;

    /**
     * Get the button containing the stop icon.
     */
    public get rootElement(): HTMLButtonElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'stopBtn';
            this._rootElement.appendChild(this.stopIcon);
            this._rootElement.appendChild(this.tooltipText);

            this._rootElement.addEventListener('click', () => {
                window.location.reload();
            });
        }
        return this._rootElement;
    }

    public get tooltipText(): HTMLElement {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Stop Streaming';
        }
        return this._tooltipText;
    }

    public get stopIcon(): HTMLElement {
        if (!this._stopIcon) {
            // Use an HTMLElement instead of SVGElement for FontAwesome
            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-stop');
            // Style the icon to be white
            icon.style.color = '#fff';
            icon.style.fontSize = '24px';

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
