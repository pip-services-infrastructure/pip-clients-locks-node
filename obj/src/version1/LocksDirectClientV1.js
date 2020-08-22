"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class LocksDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'controller', '*', '*', '1.0'));
        this._clientId = pip_services3_commons_node_1.IdGenerator.nextLong();
    }
    setClientId(client_id) {
        this._clientId = client_id;
    }
    getLocks(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'locks.get_locks');
        this._controller.getLocks(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getLockById(correlationId, key, callback) {
        let timing = this.instrument(correlationId, 'locks.get_lock_by_id');
        this._controller.getLockById(correlationId, key, (err, result) => {
            timing.endTiming();
            callback(err, result);
        });
    }
    tryAcquireLock(correlationId, key, ttl, callback) {
        let timing = this.instrument(correlationId, 'locks.try_acquire_lock');
        this._controller.tryAcquireLock(correlationId, key, ttl, this._clientId, (err, result) => {
            timing.endTiming();
            callback(err, result);
        });
    }
    acquireLock(correlationId, key, ttl, timeout, callback) {
        let timing = this.instrument(correlationId, 'locks.acquire_lock');
        this._controller.acquireLock(correlationId, key, ttl, timeout, this._clientId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    releaseLock(correlationId, key, callback) {
        let timing = this.instrument(correlationId, 'locks.release_lock');
        this._controller.releaseLock(correlationId, key, this._clientId, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
}
exports.LocksDirectClientV1 = LocksDirectClientV1;
//# sourceMappingURL=LocksDirectClientV1.js.map