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

    public static async verifyJWT(jwt: string): Promise<[boolean, string]> {
        const apiClient = new API({
            endpoint: `streaming/token/verify`,
            headers: { Authorization: `Token ${jwt}` },
            method: 'POST'
        });
        const response = await apiClient.call();
        const { error } = response;
        if (error) {
            return [false, error];
        }
        return [true, ''];
    }

    public static async pauseStream(jwt: string): Promise<[boolean, string]> {
        const apiClient = new API({
            endpoint: `streaming/token/pause`,
            headers: { Authorization: `Token ${jwt}` },
            method: 'POST'
        });
        const response = await apiClient.call();
        const { error } = response;
        if (error) {
            return [false, error];
        }
        return [true, ''];
    }

    public static async sendFeedback(
        jwt: string,
        rating: number,
        feedback: string
    ): Promise<[boolean, string]> {
        const apiClient = new API({
            endpoint: `streaming/feedback`,
            headers: { Authorization: `Token ${jwt}` },
            method: 'POST',
            body: JSON.stringify({ rating, feedback })
        });
        const response = await apiClient.call();
        const { error } = response;
        if (error) {
            return [false, error];
        }
        return [true, ''];
    }
}
