"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class LocksHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/locks');
        this._clientId = pip_services3_commons_node_1.IdGenerator.nextLong();
    }
    setClientId(client_id) {
        this._clientId = client_id;
    }
    getLocks(correlationId, filter, paging, callback) {
        this.callCommand('get_records', correlationId, {
            filter: filter,
            paging: paging
        }, (err, page) => {
            if (page == null || page.data.length == 0) {
                callback(err, page);
                return;
            }
            page.data = _.map(page.data, (record) => this.fixLock(record));
            callback(err, page);
        });
    }
    getLockById(correlationId, key, callback) {
        this.callCommand('get_lock_by_id', correlationId, {
            key: key
        }, (err, lock) => {
            callback(err, this.fixLock(lock));
        });
    }
    tryAcquireLock(correlationId, key, ttl, callback) {
        this.callCommand('try_acquire_lock', correlationId, {
            key: key,
            ttl: ttl,
            client_id: this._clientId
        }, (err, result) => {
            callback(err, result == 'true');
        });
    }
    acquireLock(correlationId, key, ttl, timeout, callback) {
        this.callCommand('acquire_lock', correlationId, {
            key: key,
            ttl: ttl,
            timeout: timeout,
            client_id: this._clientId
        }, (err) => {
            callback(err);
        });
    }
    releaseLock(correlationId, key, callback) {
        this.callCommand('release_lock', correlationId, {
            key: key,
            client_id: this._clientId
        }, (err) => {
            callback(err);
        });
    }
    fixLock(lock) {
        if (lock == null)
            return null;
        lock.created = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(lock.created);
        lock.expire_time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(lock.expire_time);
        return lock;
    }
}
exports.LocksHttpClientV1 = LocksHttpClientV1;
//# sourceMappingURL=LocksHttpClientV1.js.map