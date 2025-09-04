// Copyright Epic Games, Inc. All Rights Reserved.
import { ActionOverlay } from './ActionOverlay';

export class IconWithClickableTextOverlay extends ActionOverlay {
    public iconElement: HTMLElement;
    public titleElement: HTMLElement;

    /**
     * @returns The created root element of this overlay.
     */
    public static createRootElement(): HTMLElement {
        const iconClickableTextHtml = document.createElement('div');
        iconClickableTextHtml.id = 'iconClickableTextOverlay';
        iconClickableTextHtml.className = 'clickableState';

        const iconHtml = document.createElement('i');
        iconHtml.id = 'icon-clickable-icon';
        iconClickableTextHtml.appendChild(iconHtml);

        const titleHtml = document.createElement('div');
        titleHtml.id = 'icon-clickable-title';
        iconClickableTextHtml.appendChild(titleHtml);

        return iconClickableTextHtml;
    }

    public static createContentElement(): HTMLElement {
        const iconClickableContent = document.createElement('div');
        iconClickableContent.id = 'icon-clickable-content';
        return iconClickableContent;
    }

    public constructor(parentElem: HTMLElement) {
        super(
            parentElem,
            IconWithClickableTextOverlay.createRootElement(),
            IconWithClickableTextOverlay.createContentElement()
        );

        this.iconElement = this.rootElement.querySelector('#icon-clickable-icon') as HTMLElement;
        this.titleElement = this.rootElement.querySelector('#icon-clickable-title') as HTMLElement;

        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }

    public setTitle(title: string): void {
        this.titleElement.innerText = title;
    }

    public setIcon(icon: string[]): void {
        this.iconElement.classList.remove(...this.iconElement.classList);
        this.iconElement.classList.add(...icon);
    }
}
