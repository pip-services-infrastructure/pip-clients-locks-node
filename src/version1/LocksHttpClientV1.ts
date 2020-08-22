let _ = require('lodash');

import { LockV1 } from './LockV1';
import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { DateTimeConverter, FilterParams, PagingParams, DataPage, SortParams, IdGenerator } from 'pip-services3-commons-node';
import { ILocksClientV1 } from './ILocksClientV1';

export class LocksHttpClientV1 extends CommandableHttpClient implements ILocksClientV1 {

    private _clientId: string;

    public constructor() {
        super('v1/locks');

        this._clientId = IdGenerator.nextLong();
    }

    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LockV1>) => void): void {
        this.callCommand(
            'get_records',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            (err, page) => {
                if (page == null || page.data.length == 0) {
                    callback(err, page);
                    return;
                }

                page.data = _.map(page.data, (record) => this.fixLock(record));
                callback(err, page);
            }
        );
    }

    public getLockById(correlationId: string, key: string, callback: (err: any, job: LockV1) => void): void {
        this.callCommand(
            'get_lock_by_id',
            correlationId,
            {
                key: key
            },
            (err, lock) => {
                callback(err, this.fixLock(lock));
            }
        );
    }

    public tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void {
        this.callCommand(
            'try_acquire_lock',
            correlationId,
            {
                key: key,
                ttl: ttl,
                client_id: this._clientId
            },
            (err, result) => {
                callback(err, result == 'true');
            }
        );
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void {
        this.callCommand(
            'acquire_lock',
            correlationId,
            {
                key: key,
                ttl: ttl,
                timeout: timeout,
                client_id: this._clientId
            },
            (err) => {
                callback(err);
            }
        );
    }

    public releaseLock(correlationId: string, key: string, callback: (err: any) => void): void {
        this.callCommand(
            'release_lock',
            correlationId,
            {
                key: key,
                client_id: this._clientId
            },
            (err) => {
                callback(err);
            }
        );
    }

    private fixLock(lock: LockV1): LockV1 {
        if (lock == null) return null;

        lock.created = DateTimeConverter.toNullableDateTime(lock.created);
        lock.expire_time = DateTimeConverter.toNullableDateTime(lock.expire_time);

        return lock;
    }
}