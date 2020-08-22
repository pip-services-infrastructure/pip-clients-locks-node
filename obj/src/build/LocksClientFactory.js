"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const LocksNullClientV1_1 = require("../version1/LocksNullClientV1");
const LocksDirectClientV1_1 = require("../version1/LocksDirectClientV1");
const LocksHttpClientV1_1 = require("../version1/LocksHttpClientV1");
const DirectLock_1 = require("../lock/DirectLock");
const HttpLock_1 = require("../lock/HttpLock");
class LocksClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(LocksClientFactory.DirectLockDescriptor, DirectLock_1.DirectLock);
        this.registerAsType(LocksClientFactory.HttpLockDescriptor, HttpLock_1.HttpLock);
        this.registerAsType(LocksClientFactory.NullClientV1Descriptor, LocksNullClientV1_1.LocksNullClientV1);
        this.registerAsType(LocksClientFactory.DirectClientV1Descriptor, LocksDirectClientV1_1.LocksDirectClientV1);
        this.registerAsType(LocksClientFactory.HttpClientV1Descriptor, LocksHttpClientV1_1.LocksHttpClientV1);
    }
}
exports.LocksClientFactory = LocksClientFactory;
LocksClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'factory', 'default', 'default', '1.0');
LocksClientFactory.DirectLockDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'lock', 'direct', 'default', '1.0');
LocksClientFactory.HttpLockDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'lock', 'http', 'default', '1.0');
LocksClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'client', 'null', 'default', '1.0');
LocksClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'client', 'direct', 'default', '1.0');
LocksClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-locks', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=LocksClientFactory.js.map