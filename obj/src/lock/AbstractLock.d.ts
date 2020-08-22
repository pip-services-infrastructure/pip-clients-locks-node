import { Lock } from "pip-services3-components-node";
import { ILocksClientV1 } from "../version1/ILocksClientV1";
import { ConfigParams } from "pip-services3-commons-node";
export declare class AbstractLock extends Lock {
    protected _client: ILocksClientV1;
    constructor(client: ILocksClientV1);
    configure(config: ConfigParams): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
