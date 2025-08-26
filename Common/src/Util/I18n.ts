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
        maxPlayerMessage: 'Streamer is full.'
    },
    ja: {
        maxPlayerMessage:
            '只今サーバーを立ち上げています。（現ベータ版では）5分以上要することがありますので、ブラウザーのタブを閉じないでお待ちください。'
    }
};
