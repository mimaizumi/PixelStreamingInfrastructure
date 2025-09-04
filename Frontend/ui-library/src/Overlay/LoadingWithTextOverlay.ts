// Copyright Epic Games, Inc. All Rights Reserved.
import { OverlayBase } from './BaseOverlay';

export class LoadingWithTextOverlay extends OverlayBase {
    public loadingTextElement: HTMLElement;
    /**
     * @returns The created root element of this overlay.
     */
    public static createRootElement(loadingLabel: string = 'Streaming Live'): HTMLElement {
        const loadingOverlayHtml = document.createElement('div');
        loadingOverlayHtml.id = 'loadingOverlay';

        const loadingIcon = document.createElement('div');
        loadingIcon.className = 'loadingIcon';
        loadingOverlayHtml.appendChild(loadingIcon);

        const loadingText = document.createElement('div');
        loadingText.id = 'rdesign-loading-text';
        loadingText.className = 'loadingText';
        loadingText.innerText = loadingLabel;
        loadingOverlayHtml.appendChild(loadingText);

        return loadingOverlayHtml;
    }

    public static createContentElement(): HTMLElement {
        const loadingContentHtml = document.createElement('div');
        loadingContentHtml.className = 'loadingContent';
        return loadingContentHtml;
    }

    /**
     * Construct a loading with text overlay
     * @param rootDiv - the root element this overlay will be inserted into
     */
    public constructor(rootDiv: HTMLElement) {
        super(
            rootDiv,
            LoadingWithTextOverlay.createRootElement(),
            LoadingWithTextOverlay.createContentElement()
        );

        this.textElement.style.fontSize = '16px';
        this.loadingTextElement = this.rootElement.querySelector('#rdesign-loading-text') as HTMLElement;
    }

    /**
     * Update the text overlays inner text
     * @param text - the update text to be inserted into the overlay
     */
    public update(text: string): void {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    }

    public updateLoadingText(text: string): void {
        if (text != null || text != undefined) {
            this.loadingTextElement.innerHTML = text;
        }
    }
}
