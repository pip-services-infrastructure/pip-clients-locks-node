import { ILock, Lock } from "pip-services3-components-node";
import { ILocksClientV1 } from "../version1/ILocksClientV1";
import { ConfigParams, IdGenerator } from "pip-services3-commons-node";


export class AbstractLock extends Lock
{
    protected _client: ILocksClientV1;

    public constructor(client: ILocksClientV1) {
        super();

        this._client = client;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);

        let clientId = config.getAsStringWithDefault("options.client_id", null);
        if (clientId) this._client.setClientId(clientId);
    }
    
    public tryAcquireLock(correlationId: string, key: string, ttl: number, 
        callback: (err: any, result: boolean) => void): void {
        this._client.tryAcquireLock(correlationId, key, ttl, callback);
    }

    public releaseLock(correlationId: string, key: string, 
        callback?: (err: any) => void): void {
        this._client.releaseLock(correlationId, key, callback);
    }
}