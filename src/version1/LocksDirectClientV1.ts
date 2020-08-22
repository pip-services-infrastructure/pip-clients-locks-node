import { ILocksClientV1 } from './ILocksClientV1';
import { DirectClient } from 'pip-services3-rpc-node';
import { Descriptor, IdGenerator } from 'pip-services3-commons-node';
import { LockV1 } from './LockV1';


export class LocksDirectClientV1 extends DirectClient<any> implements ILocksClientV1 {

    private _clientId: string;

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-locks', 'controller', '*', '*', '1.0'));

        this._clientId = IdGenerator.nextLong();
    }

    public setClientId(client_id: string) {
        this._clientId = client_id;
    }

    public getLocks(correlationId: string, filter: any, paging: any, callback: (err: any, page: any) => void): void {
        let timing = this.instrument(correlationId, 'locks.get_locks');
        this._controller.getLocks(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getLockById(correlationId: string, key: string, callback: (err: any, lock: LockV1) => void): void {
        let timing = this.instrument(correlationId, 'locks.get_lock_by_id');
        this._controller.getLockById(correlationId, key, (err, result) => {
            timing.endTiming();
            callback(err, result);
        });
    }

    public tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void {
        let timing = this.instrument(correlationId, 'locks.try_acquire_lock');
        this._controller.tryAcquireLock(correlationId, key, ttl, this._clientId, (err, result) => {
            timing.endTiming();
            callback(err, result);
        });
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'locks.acquire_lock');
        this._controller.acquireLock(correlationId, key, ttl, timeout, this._clientId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    public releaseLock(correlationId: string, key: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'locks.release_lock');
        this._controller.releaseLock(correlationId, key, this._clientId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}