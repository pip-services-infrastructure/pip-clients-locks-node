import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ILocksClientV1 } from './ILocksClientV1';
import { LockV1 } from './LockV1';
export declare class LocksNullClientV1 implements ILocksClientV1 {
    private _clientId;
    constructor(config?: any);
    setClientId(client_id: string): void;
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, job: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
