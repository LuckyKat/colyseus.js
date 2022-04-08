export interface ITransportEventMap {
    onopen?: ((ev: any) => any) | null;
    onmessage?: ((ev: any) => any) | null;
    onclose?: ((ev: any) => any) | null;
    onerror?: ((ev: any) => any) | null;
}

export interface TransportOptions {
    type?: string

    // geckos
    label?: string,
    iceServers?: RTCIceServer[]
    iceTransportPolicy?: RTCIceTransportPolicy
}

export interface ITransportConstructor {
    new (events: ITransportEventMap, options?: TransportOptions): ITransport;
}

export interface ITransport {
    send(data: ArrayBuffer | Array<number>): void;
    connect(url: string): void;
    close(code?: number, reason?: string): void;
}