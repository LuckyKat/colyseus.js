import { ITransport, ITransportEventMap, TransportOptions } from "./transport/ITransport";
import { WebSocketTransport } from "./transport/WebSocketTransport";
import { GeckosTransport } from "./transport/GeckosTransport";


export class Connection implements ITransport {
    transport: ITransport;
    events: ITransportEventMap = {};

    constructor(options: TransportOptions = { type: 'geckos' }) {
        if (options && options.type === 'geckos') {
            this.transport = new GeckosTransport(this.events, options);
        } else {
            this.transport = new WebSocketTransport(this.events, options);
        }
    }

    send(data: ArrayBuffer | Array<number>): void {
        this.transport.send(data);
    }

    connect(url: string): void {
        this.transport.connect(url);
    }

    close(code?: number, reason?: string): void {
        this.transport.close(code, reason);
    }

}
