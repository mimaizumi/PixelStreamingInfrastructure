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
