import { AbstractLock } from "./AbstractLock";
import { LocksHttpClientV1 } from "../version1/LocksHttpClientV1";

export class HttpLock extends AbstractLock {
    public constructor() {
        super(new LocksHttpClientV1());
    }
}