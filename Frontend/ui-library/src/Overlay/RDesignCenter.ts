// Copyright Epic Games, Inc. All Rights Reserved.
export class RDesignCenter {
    _rootElement: HTMLElement;

    _resolution: string | null;
    _frameRate: string | null;
    _bitrate: string | null;
    _latency: string | null;

    public static createRootElement(): HTMLElement {
        const rdesignCenterHtml = document.createElement('div');
        rdesignCenterHtml.id = 'rdesignCenter';
        return rdesignCenterHtml;
    }

    public static createMainButton(): HTMLElement {
        const rdesignCenterButton = document.createElement('div');
        rdesignCenterButton.id = 'rdesignCenterButton';
        rdesignCenterButton.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

        rdesignCenterButton.addEventListener('click', () => {
            const menu = document.getElementById('rdesignCenterMenu');
            if (menu) {
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            }
        });
        return rdesignCenterButton;
    }

    public static createMenu(): HTMLElement {
        const rdesignCenterHtmlInner = document.createElement('div');
        rdesignCenterHtmlInner.id = 'rdesignCenterMenu';

        // Streaming Controls Section
        const controlsSection = document.createElement('div');
        controlsSection.className = 'menuSection';

        const controlsHeader = document.createElement('div');
        controlsHeader.className = 'menuHeader';
        controlsHeader.innerText = 'Streaming Controls';
        controlsSection.appendChild(controlsHeader);

        // Quality Settings Button
        const qualityBtn = document.createElement('div');
        qualityBtn.className = 'menuBtn';
        qualityBtn.innerHTML = '<i class="fa-solid fa-cog"></i> Quality Settings';
        controlsSection.appendChild(qualityBtn);

        // Audio Settings Button
        const audioBtn = document.createElement('div');
        audioBtn.className = 'menuBtn';
        audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Audio Settings';
        controlsSection.appendChild(audioBtn);

        // Fullscreen Button
        const fullscreenBtn = document.createElement('div');
        fullscreenBtn.className = 'menuBtn';
        fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Fullscreen';
        controlsSection.appendChild(fullscreenBtn);

        rdesignCenterHtmlInner.appendChild(controlsSection);

        // Connection Info Section
        const infoSection = document.createElement('div');
        infoSection.className = 'menuSection';

        const infoHeader = document.createElement('div');
        infoHeader.className = 'menuHeader';
        infoHeader.innerText = 'Connection Info';
        infoSection.appendChild(infoHeader);

        // Info List
        infoSection.appendChild(RDesignCenter.createInfoList());
        rdesignCenterHtmlInner.appendChild(infoSection);

        // Stop Streaming Button
        const stopBtn = document.createElement('div');
        stopBtn.className = 'stopStreamingBtn';
        stopBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Streaming';
        rdesignCenterHtmlInner.appendChild(stopBtn);

        rdesignCenterHtmlInner.style.display = 'none';

        return rdesignCenterHtmlInner;
    }

    public static createInfoList() {
        const infoList = document.createElement('ul');
        infoList.className = 'connectionInfoList';
        infoList.innerHTML = `
      <li><span>Resolution:</span> <span id="resolution">-</span></li>
      <li><span>Frame Rate:</span> <span id="frameRate">-</span></li>
      <li><span>Bitrate:</span> <span id="bitrate">-</span></li>
      <li><span>Latency:</span> <span id="latency">-</span></li>
    `;
        return infoList;
    }

    public updateInfoList(resolution: string, frameRate: string, bitrate: string, latency: string) {
        this._resolution = resolution;
        this._frameRate = frameRate;
        this._bitrate = bitrate;
        this._latency = latency;

        const resolutionSpan = document.getElementById('resolution');
        const frameRateSpan = document.getElementById('frameRate');
        const bitrateSpan = document.getElementById('bitrate');
        const latencySpan = document.getElementById('latency');

        if (resolutionSpan) {
            resolutionSpan.innerText = this._resolution;
        }
        if (frameRateSpan) {
            frameRateSpan.innerText = this._frameRate;
        }
        if (bitrateSpan) {
            bitrateSpan.innerText = this._bitrate;
        }
        if (latencySpan) {
            latencySpan.innerText = this._latency;
        }
    }

    constructor() {
        this._rootElement = RDesignCenter.createRootElement();
        this._rootElement.appendChild(RDesignCenter.createMainButton());
        this._rootElement.appendChild(RDesignCenter.createMenu());
    }

    public get rootElement(): HTMLElement {
        return this._rootElement;
    }
}
