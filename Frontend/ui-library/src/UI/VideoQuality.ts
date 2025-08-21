// Copyright Epic Games, Inc. All Rights Reserved.
export class VideoQuality {
    _rootElement: HTMLElement;

    constructor() {}

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'videoQuality';
            this._rootElement.style.display = 'none';
        }
        return this._rootElement;
    }

    public updateQualityText(text: string) {
        this._rootElement.textContent = this.displayText(text);
        if (text.length > 0) {
            this._rootElement.style.display = 'block';
        } else {
            this._rootElement.style.display = 'none';
        }
    }

    private displayText(text: string): string {
        switch (text) {
            case '2560x1440':
            case '2560x1600':
                return '2K';
            case '3840x2160':
                return '4K';
            case '7680x4320':
                return '8K';
            case '1920x1080':
                return '1080p';
            case '1280x720':
                return '720p';
            case '800x600':
                return '600p';
            case '640x480':
                return '480p';
            default:
                return text;
        }
    }
}
