let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IdGenerator } from 'pip-services3-commons-node';
import { ILocksClientV1 } from '../../src/version1/ILocksClientV1';

let LOCK1: string = "lock_1";
let LOCK2: string = "lock_2";
let LOCK3: string = "lock_3";

export class LocksClientFixtureV1 {
    private _client: ILocksClientV1;
    private _clientId: string;
    private _adminId: string;

    constructor(client: ILocksClientV1, clientId: string, adminId: string) {
        this._client = client;
        this._clientId = clientId;
        this._adminId = adminId;
    }

    public testTryAcquireLock(done) {
        async.series([
            // Try to acquire lock for the first time
            (callback) => {
                this._client.tryAcquireLock(null, LOCK1, 3000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isTrue(result);
                    callback();
                });
            },
            // Try to acquire lock for the second time
            (callback) => {
                this._client.tryAcquireLock(null, LOCK1, 3000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isFalse(result);
                    callback();
                });
            },
            // Release the lock
            (callback) => {
                this._client.releaseLock(null, LOCK1, callback);
            },
            // Try to acquire lock for the third time
            (callback) => {
                this._client.tryAcquireLock(null, LOCK1, 3000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isTrue(result);
                    callback();
                });
            },
            // Release the lock
            (callback) => {
                this._client.releaseLock(null, LOCK1, callback);
            },
            // Try to acquire lock for the fourth time
            (callback) => {
                this._client.tryAcquireLock(null, LOCK1, 4000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isTrue(result);
                    callback();
                });
            },
            // Try to release the lock with wrong client id
            (callback) => {
                this._client.setClientId(IdGenerator.nextLong());
                this._client.releaseLock(null, LOCK1, (err) => {
                    assert.isNotNull(err || null); // should get an error
                    callback();
                });
            },
            // Try to acquire lock to check it still exist
            (callback) => {
                this._client.setClientId(this._clientId);
                this._client.tryAcquireLock(null, LOCK1, 4000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isFalse(result);
                    callback();
                });
            },
            // Release the lock with admin id
            (callback) => {
                this._client.setClientId(this._adminId);
                this._client.releaseLock(null, LOCK1, (err) => {
                    assert.isNull(err || null);
                    callback();
                });
            },
            // Try to acquire lock to check it not exist
            (callback) => {
                this._client.setClientId(this._adminId);
                this._client.tryAcquireLock(null, LOCK1, 4000, (err, result) => {
                    assert.isNull(err || null);
                    assert.isTrue(result);
                    callback();
                });
            },
            // Release the lock
            (callback) => {
                this._client.releaseLock(null, LOCK1, callback);
            },
        ], done);
    }

    public testAcquireLock(done) {
        async.series([
            // Acquire lock for the first time
            (callback) => {
                this._client.acquireLock(null, LOCK2, 3000, 1000, (err) => {
                    assert.isNull(err || null);
                    callback();
                });
            },
            // Acquire lock for the second time
            (callback) => {
                this._client.acquireLock(null, LOCK2, 3000, 1000, (err) => {
                    assert.isNotNull(err || null);
                    callback();
                });
            },
            // Release the lock
            (callback) => {
                this._client.releaseLock(null, LOCK2, callback)
            },
            // Acquire lock for the third time
            (callback) => {
                this._client.acquireLock(null, LOCK2, 3000, 1000, (err) => {
                    assert.isNull(err || null);
                    callback();
                });
            },
            // Release the lock
            (callback) => {
                this._client.releaseLock(null, LOCK2, callback)
            },
        ], done);
    }
}
