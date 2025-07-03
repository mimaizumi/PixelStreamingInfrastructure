// Copyright Epic Games, Inc. All Rights Reserved.
interface ConfigParams {
    method?: string | 'GET';
    body?: string | null;
    headers?: HeadersInit | null;
    endpoint: string;
}

export class API {
    static BASE_URL = 'https://materialdb.r.design/' as const;

    private _method: string;
    private _body: string;
    private _headers: HeadersInit;
    private _endpoint: string;

    constructor(config: ConfigParams) {
        this._method = config.method || 'GET';
        this._body = config.body || null;
        this._headers = config.headers ?? undefined;
        this._endpoint = config.endpoint;
    }

    public async call() {
        const response = await fetch(`${API.BASE_URL}${this._endpoint}`, {
            method: this._method,
            body: this._body,
            headers: this._headers
        });
        return response.json();
    }
}
