"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLock_1 = require("./AbstractLock");
const LocksDirectClientV1_1 = require("../version1/LocksDirectClientV1");
class DirectLock extends AbstractLock_1.AbstractLock {
    constructor() {
        super(new LocksDirectClientV1_1.LocksDirectClientV1());
    }
}
exports.DirectLock = DirectLock;
//# sourceMappingURL=DirectLock.js.map