"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class LocksNullClientV1 {
    constructor(config) { }
    setClientId(client_id) {
        this._clientId = client_id;
    }
    getLocks(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage());
    }
    getLockById(correlationId, key, callback) {
        callback(null, null);
    }
    tryAcquireLock(correlationId, key, ttl, callback) {
        callback(null, null);
    }
    acquireLock(correlationId, key, ttl, timeout, callback) {
        callback(null);
    }
    releaseLock(correlationId, key, callback) {
        callback(null);
    }
}
exports.LocksNullClientV1 = LocksNullClientV1;
//# sourceMappingURL=LocksNullClientV1.js.map