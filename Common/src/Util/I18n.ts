// Copyright Epic Games, Inc. All Rights Reserved.
export class I18n {
    static t(key: string, locale: string = 'en', options: object = {}): string {
        return translations[locale][key].replace(
            /{(\w+)}/g,
            (match, key) => options[key as keyof typeof options] || match
        );
    }
}

const translations: Record<string, Record<string, string>> = {
    en: {
        maxPlayerMessage: 'Preparing your session… (allocating resources)',
        controlsGuide: 'Controls Guide',
        navidate3D: 'Navigate the 3D room using these controls',
        moveForward: 'Move Forward',
        leftRightBack: 'Left / Back / Right',
        upDown: 'Up / Down',
        specifyItem: 'Specify an Item',
        leftClick: 'Left Click',
        zoomInOut: 'Zoom In/Out',
        scrollWheel: 'Scroll Wheel',
        pan: 'Pan',
        middlePressDrag: 'Middle Press & Drag',
        lookAround: 'Look Around',
        rightClickDrag: 'Right Click & Drag',
        pressAndHold: 'Press and hold keys for continuous movement',
        autoConnectingNow: 'Running connection checks… Almost there'
    },
    ja: {
        maxPlayerMessage: 'Preparing your session… (allocating resources)',
        controlsGuide: '操作ガイド',
        navidate3D: '以下の操作で3Dルームを移動できます',
        moveForward: '前進',
        leftRightBack: '左へ / 後進 / 右へ',
        upDown: '上へ / 下へ',
        specifyItem: 'アイテムを指定',
        leftClick: '左クリック',
        zoomInOut: 'ズームイン/アウト',
        scrollWheel: 'スクロールホイール',
        pan: 'パン（平行移動）',
        middlePressDrag: 'マウス中央ボタン押し＋ドラッグ',
        lookAround: '見回す',
        rightClickDrag: '右クリック＋ドラッグ',
        pressAndHold: 'キーを押し続けると連続的に移動できます',
        autoConnectingNow: 'Running connection checks… Almost there'
    }
};
