import { ITransport, ITransportEventMap, TransportOptions } from "./ITransport";
import geckos from "@geckos.io/client"

export class GeckosTransport implements ITransport {
    client: any;
    protocols?: string | string[];

    constructor(public events: ITransportEventMap, public options?: TransportOptions) {}

    public send(data: ArrayBuffer | Array<number>): void {
        if (data instanceof ArrayBuffer) {
            this.client.send(data);
        } else {
            console.warn('Only send with ArrayBuffer is supported');
        }
    }

    public connect(url: string) {
        let client = geckos({
            url: url,
            ...this.options
        });
        let events = this.events;
        
        client.onConnect((error) => {
            if (error) {
                console.error(error.message)
                return
            }
            
            let channel = client.connectionsManager.dataChannel

            channel.binaryType = 'arraybuffer'
            channel.onmessage = events.onmessage;
            channel.onclose = events.onclose;
            channel.onerror = events.onerror;
        });

        this.client = client;
    }

    public close(code?: number, reason?: string) {
        // TODO: what to do with code and reason?
        this.client.close();
    }

}