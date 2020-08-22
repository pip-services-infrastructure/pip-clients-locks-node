"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
class AbstractLock extends pip_services3_components_node_1.Lock {
    constructor(client) {
        super();
        this._client = client;
    }
    configure(config) {
        super.configure(config);
        let clientId = config.getAsStringWithDefault("options.client_id", null);
        if (clientId)
            this._client.setClientId(clientId);
    }
    tryAcquireLock(correlationId, key, ttl, callback) {
        this._client.tryAcquireLock(correlationId, key, ttl, callback);
    }
    releaseLock(correlationId, key, callback) {
        this._client.releaseLock(correlationId, key, callback);
    }
}
exports.AbstractLock = AbstractLock;
//# sourceMappingURL=AbstractLock.js.map