import { AbstractLock } from "./AbstractLock";
import { LocksDirectClientV1 } from "../version1/LocksDirectClientV1";

export class DirectLock extends AbstractLock {
    public constructor() {
        super(new LocksDirectClientV1());
    }
}