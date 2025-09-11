// Copyright Epic Games, Inc. All Rights Reserved.
import { API, Logger } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';

export class Feedback {
    _rootElement: HTMLElement;
    _innerModal: HTMLElement;

    lang: string;
    jwt: string;
    rating: number;
    feedback: string;

    constructor(lang: string, jwt: string) {
        this.lang = lang;
        this.jwt = jwt;
        this.rating = 0;
        this.feedback = '';
        this._rootElement = this.rootElement;
    }

    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'feedback';
            this._rootElement.classList.add('modal');
            this._rootElement.style.display = 'none';
            this._rootElement.appendChild(this.innerModal);
        }
        return this._rootElement;
    }

    public get innerModal(): HTMLElement {
        if (!this._innerModal) {
            this._innerModal = document.createElement('div');
            this._innerModal.classList.add('feedback-container');

            // Header
            const header = document.createElement('div');
            header.classList.add('feedback-header');
            header.textContent = 'Send Feedback';

            // star rating
            const starRating = document.createElement('div');
            starRating.classList.add('feedback-star-rating');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fa-regular', 'fa-star');
                star.addEventListener('mouseover', () => {
                    for (let j = 0; j <= i; j++) {
                        starRating.children[j].classList.remove('fa-regular');
                        starRating.children[j].classList.add('fa-solid');
                    }
                });
                star.addEventListener('mouseout', () => {
                    for (let j = 0; j <= i; j++) {
                        if (this.rating > j) {
                            starRating.children[j].classList.remove('fa-regular');
                            starRating.children[j].classList.add('fa-solid');
                        } else {
                            starRating.children[j].classList.remove('fa-solid');
                            starRating.children[j].classList.add('fa-regular');
                        }
                    }
                });
                star.addEventListener('click', () => {
                    this.rating = i + 1;
                    for (let j = 0; j < 5; j++) {
                        if (this.rating > j) {
                            starRating.children[j].classList.remove('fa-regular');
                            starRating.children[j].classList.add('fa-solid');
                        } else {
                            starRating.children[j].classList.remove('fa-solid');
                            starRating.children[j].classList.add('fa-regular');
                        }
                    }
                });
                starRating.appendChild(star);
            }

            // Text area container
            const textAreaContainer = document.createElement('div');
            textAreaContainer.classList.add('feedback-textarea-container');

            // Text area
            const textArea = document.createElement('textarea');
            textArea.id = 'feedback-text';
            textArea.placeholder = 'Tell us about your experience...';
            textArea.maxLength = 1000;

            // Character counter
            const charCounter = document.createElement('div');
            charCounter.classList.add('feedback-counter');
            charCounter.textContent = '0/1000';

            // Update character counter on input
            textArea.addEventListener('input', (e) => {
                const target = e.target as HTMLTextAreaElement;
                charCounter.textContent = `${target.value.length}/1000`;
                this.feedback = target.value;
            });

            // Submit button
            const submitButton = document.createElement('button');
            submitButton.classList.add('feedback-submit');
            submitButton.textContent = 'Send';
            submitButton.addEventListener('click', () => void this.submit());

            // Close button
            const closeButton = document.createElement('button');
            closeButton.classList.add('feedback-close');
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', () => this.hide());

            // Assemble the modal
            textAreaContainer.appendChild(textArea);
            textAreaContainer.appendChild(charCounter);

            this._innerModal.appendChild(header);
            this._innerModal.appendChild(starRating);
            this._innerModal.appendChild(textAreaContainer);
            this._innerModal.appendChild(submitButton);
            this._innerModal.appendChild(closeButton);
        }
        return this._innerModal;
    }

    public get submitButton(): HTMLButtonElement {
        return this._innerModal.querySelector('.feedback-submit') as HTMLButtonElement;
    }

    public show() {
        this._rootElement.style.display = 'flex';
    }

    public hide() {
        this._rootElement.style.display = 'none';
    }

    public async submit() {
        this.submitButton.disabled = true;
        const [success, error] = await API.sendFeedback(this.jwt, this.rating, this.feedback);
        if (success) {
            this.hide();
        } else {
            Logger.RDesign(error);
            this.submitButton.disabled = false;
        }
    }
}
