// Copyright Epic Games, Inc. All Rights Reserved.
export class GuidePanel {
    _rootElement: HTMLElement;

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'guide-panel';
            this._rootElement.classList.add('d-none');

            const title = document.createElement('div');
            title.id = 'guide-panel-title';
            title.textContent = 'Controls Guide';
            this._rootElement.appendChild(title);

            const subtitle = document.createElement('div');
            subtitle.id = 'guide-panel-subtitle';
            subtitle.textContent = 'Navigate the 3D room using these controls';
            this._rootElement.appendChild(subtitle);

            const movement = document.createElement('div');
            movement.id = 'guide-panel-movement';
            movement.textContent = 'Movement';
            this._rootElement.appendChild(movement);

            const moveForward = document.createElement('div');
            moveForward.id = 'guide-panel-move-forward';

            const moveForwardIcon = document.createElement('div');
            moveForwardIcon.classList.add('key-icon');
            moveForwardIcon.textContent = 'W';
            moveForward.appendChild(moveForwardIcon);

            const moveForwardText = document.createElement('div');
            moveForwardText.classList.add('key-text');
            moveForwardText.textContent = 'Move Forward';
            moveForward.appendChild(moveForwardText);

            this._rootElement.appendChild(moveForward);

            const moveAround = document.createElement('div');
            moveAround.id = 'guide-panel-move-around';

            const movingKeys = document.createElement('div');
            movingKeys.id = 'guide-panel-moving-keys';

            const moveLeftIcon = document.createElement('div');
            moveLeftIcon.classList.add('key-icon');
            moveLeftIcon.textContent = 'A';
            movingKeys.appendChild(moveLeftIcon);

            const moveBackIcon = document.createElement('div');
            moveBackIcon.classList.add('key-icon');
            moveBackIcon.textContent = 'S';
            movingKeys.appendChild(moveBackIcon);

            const moveRightIcon = document.createElement('div');
            moveRightIcon.classList.add('key-icon');
            moveRightIcon.textContent = 'D';
            movingKeys.appendChild(moveRightIcon);

            moveAround.appendChild(movingKeys);

            const moveAroundText = document.createElement('div');
            moveAroundText.classList.add('key-text');
            moveAroundText.textContent = 'Left / Back / Right';
            moveAround.appendChild(moveAroundText);

            this._rootElement.appendChild(moveAround);

            const moveUpDown = document.createElement('div');
            moveUpDown.id = 'guide-panel-move-up-down';

            const moveUpDownIcons = document.createElement('div');
            moveUpDownIcons.id = 'guide-panel-move-up-down-icons';

            const moveUpIcon = document.createElement('div');
            moveUpIcon.classList.add('key-icon');
            moveUpIcon.textContent = 'Q';
            moveUpDownIcons.appendChild(moveUpIcon);

            const moveDownIcon = document.createElement('div');
            moveDownIcon.classList.add('key-icon');
            moveDownIcon.textContent = 'E';
            moveUpDownIcons.appendChild(moveDownIcon);

            moveUpDown.appendChild(moveUpDownIcons);

            const moveUpDownText = document.createElement('div');
            moveUpDownText.classList.add('key-text');
            moveUpDownText.textContent = 'Up / Down';
            moveUpDown.appendChild(moveUpDownText);

            this._rootElement.appendChild(moveUpDown);

            const mouse = document.createElement('div');
            mouse.id = 'guide-panel-mouse';
            mouse.textContent = 'Mouse';
            this._rootElement.appendChild(mouse);

            const mouseModes = document.createElement('div');
            mouseModes.id = 'guide-panel-mouse-modes';

            const mouseLeftMode = document.createElement('div');
            mouseLeftMode.id = 'guide-panel-mouse-left-mode';

            mouseModes.appendChild(mouseLeftMode);

            this._rootElement.appendChild(mouseModes);

            const divide = document.createElement('div');
            divide.style.borderBottom = '1px solid #d1d1d1';
            this._rootElement.appendChild(divide);

            const footer = document.createElement('div');
            footer.id = 'guide-panel-footer';
            footer.textContent = 'Press and hold keys for continuous movement';
            this._rootElement.appendChild(footer);
        }
        return this._rootElement;
    }

    public visible(): boolean {
        return !this._rootElement.classList.contains('d-none');
    }

    public show(): void {
        this._rootElement.classList.remove('d-none');
    }

    public hide(): void {
        this._rootElement.classList.add('d-none');
    }
}
