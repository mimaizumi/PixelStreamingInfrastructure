// Copyright Epic Games, Inc. All Rights Reserved.
import { jsonc } from 'jsonc';

/**
 * Cirular reference safe version of JSON.stringify
 */
export function stringify(obj: any): string {
    return jsonc.stringify(obj);
}

/**
 * Circular reference save version of JSON.stringify with extra formatting.
 */
export function beautify(obj: any): string {
    return jsonc.stringify(obj, undefined, '\t');
}

export function fetchPauseAPI(jwt: string) {
    return fetch(`https://material-db.herokuapp.com/streaming/token/pause`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${jwt}`
        }
    });
}

export function fetchHeartbeatAPI(jwt: string) {
    return fetch(`https://material-db.herokuapp.com/streaming/token/heartbeat`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${jwt}`
        }
    });
}
