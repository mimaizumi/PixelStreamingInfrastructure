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

export function fetchPlayerConnect(jwt: string, memberId: string, sessionId: string) {
    return fetch(`https://material-db.herokuapp.com/streaming/player/connected`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: memberId, streaming_session_id: sessionId })
    });
}

export function fetchPlayerDisconnect(jwt: string, memberId: string, sessionId: string) {
    return fetch(`https://material-db.herokuapp.com/streaming/player/disconnected`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: memberId, streaming_session_id: sessionId })
    });
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function extractDataFromJWT(jwt: string): { memberId: string; sessionId: string } {
    const token = jwt.split('.')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return { memberId: decoded.member_id, sessionId: decoded.session_id };
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
