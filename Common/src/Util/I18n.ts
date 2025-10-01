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
        maxPlayerMessage: 'Preparing your session (allocating resources)…',
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
        autoConnectingNow: 'Running connection checks… Almost there',
        typically1Minute: 'Typically ~1 minute (times can vary).',
        serverUnreachable: 'Your server is still starting (~1 minute to come online)',
        clickRestartToCheck: 'Click here to check again.',
        waitingForStreamer: 'The server is ready; starting the app. You’ll be connected automatically.',
        gaveUpWaitingForStreamer:
            'The server is ready, but the app didn’t start in time. Click to try again.',
        clickToResume: 'Click to resume',
        goodput: 'Goodput',
        chooseQuality: 'Choose Quality:',
        fullHD: 'Full HD',
        standard: 'Standard',
        lowData: 'Low Data',
        ultraLowData: 'Ultra Low Data',
        notConnected: 'Not connected',
        good: 'Good',
        blocky: 'Blocky',
        poor: 'Poor'
    },
    ja: {
        maxPlayerMessage: 'セッションを準備しています（リソースを確保中）…',
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
        autoConnectingNow: '接続テスト中… まもなく開始します。',
        typically1Minute: '所要時間の目安：約1分',
        serverUnreachable: 'サーバーを起動中です。',
        clickRestartToCheck: 'ここをクリックして再試行してください。',
        waitingForStreamer: 'サーバー準備は完了し、アプリを起動中です。接続は自動で開始します。',
        gaveUpWaitingForStreamer:
            'サーバー準備は完了しましたが、アプリが正常に起動しませんでした。ここをクリックしてもう一度お試し下さい。',
        clickToResume: 'Click to resume',
        goodput: '実効下り',
        chooseQuality: '画質を選ぶ:',
        fullHD: 'フルHD',
        standard: '標準',
        lowData: '省データ',
        ultraLowData: '超省データ',
        notConnected: '未接続',
        good: '良好',
        blocky: '粗い',
        poor: '不安定'
    }
};
