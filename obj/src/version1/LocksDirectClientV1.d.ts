import { ILocksClientV1 } from './ILocksClientV1';
import { DirectClient } from 'pip-services3-rpc-node';
import { LockV1 } from './LockV1';
export declare class LocksDirectClientV1 extends DirectClient<any> implements ILocksClientV1 {
    private _clientId;
    constructor();
    setClientId(client_id: string): void;
    getLocks(correlationId: string, filter: any, paging: any, callback: (err: any, page: any) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, lock: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
