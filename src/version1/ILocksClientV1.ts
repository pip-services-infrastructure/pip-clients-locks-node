import { DataPage, SortParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { LockV1 } from './LockV1';

export interface ILocksClientV1 {

    // Set client id
    setClientId(client_id: string); 

    // Get list of all locks
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LockV1>) => void): void;
    
    // Get lock by key
    getLockById(correlationId: string, key: string, 
        callback: (err: any, job: LockV1) => void): void;
    
    // Makes a single attempt to acquire a lock by its key
    tryAcquireLock(correlationId: string, key: string, ttl: number, 
        callback: (err: any, result: boolean) => void): void;
    
    // Makes multiple attempts to acquire a lock by its key within give time interval
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void;
    
        // Releases prevously acquired lock by its key
    releaseLock(correlationId: string, key: string, 
        callback: (err: any) => void): void;
}
