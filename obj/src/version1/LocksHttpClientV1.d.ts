import { LockV1 } from './LockV1';
import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { FilterParams, PagingParams, DataPage } from 'pip-services3-commons-node';
import { ILocksClientV1 } from './ILocksClientV1';
export declare class LocksHttpClientV1 extends CommandableHttpClient implements ILocksClientV1 {
    private _clientId;
    constructor();
    setClientId(client_id: string): void;
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, job: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
    private fixLock;
}
