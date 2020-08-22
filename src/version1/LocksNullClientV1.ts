import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { ILocksClientV1 } from './ILocksClientV1';
import { LockV1 } from './LockV1';

export class LocksNullClientV1 implements ILocksClientV1 {
    private _clientId: string;

    constructor(config?: any) { }
    
    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LockV1>) => void): void {
        callback(null, new DataPage<LockV1>());
    }

    public getLockById(correlationId: string, key: string, 
        callback: (err: any, job: LockV1) => void): void {
        callback(null, null);
    }

    public tryAcquireLock(correlationId: string, key: string, ttl: number, 
        callback: (err: any, result: boolean) => void): void {
        callback(null, null);
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number, 
        callback: (err: any) => void): void {
        callback(null);
    }
    
    public releaseLock(correlationId: string, key: string, 
        callback: (err: any) => void): void {
        callback(null);
    }
}
