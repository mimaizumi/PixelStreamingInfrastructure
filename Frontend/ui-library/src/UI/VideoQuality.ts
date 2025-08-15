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
        this._rootElement.textContent = text;
        if (text.length > 0) {
            this._rootElement.style.display = 'block';
        } else {
            this._rootElement.style.display = 'none';
        }
    }
}
