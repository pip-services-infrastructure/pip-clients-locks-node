"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLock_1 = require("./AbstractLock");
const LocksHttpClientV1_1 = require("../version1/LocksHttpClientV1");
class HttpLock extends AbstractLock_1.AbstractLock {
    constructor() {
        super(new LocksHttpClientV1_1.LocksHttpClientV1());
    }
}
exports.HttpLock = HttpLock;
//# sourceMappingURL=HttpLock.js.map