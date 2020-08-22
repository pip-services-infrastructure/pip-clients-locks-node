Node.js client API for Locks microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [ILocksClientV1 interface](#interface)
    - [getLocks()](#operation1)
    - [getLockById()](#operation2)
    - [tryAcquireLock()](#operation3)
    - [acquireLock()](#operation4)
    - [releaseLock()](#operation5)
* [LocksHttpClientV1 class](#client_http)
* [LocksDirectClientV1 class](#client_direct)
* [LocksNullClientV1 class](#client_null)

## <a name="interface"></a> ILocksClientV1 interface

If you are using Typescript, you can use ILocksClientV1 as a common interface across all client implementations.
If you are using plain typescript, you shall not worry about ILocksClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```typescript
interface ILocksClientV1 {
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, result: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
```

### <a name="operation1"></a> getLocks(correlationId, filter, paging, callback)

Get list of all locks

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- filter: FilterParams - filter parameters
- paging: PagingParams - paging parameters

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<LockV1> - Page with retrieved locks

### <a name="operation2"></a> getLockById(correlationId, key, callback)

Get lock by key

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- key: string - a unique lock key

**Returns:**
- err: Error - occured error or null for success
- result: LockV1 - finded lock

### <a name="operation3"></a> tryAcquireLock(correlationId, key, ttl, callback)

Makes a single attempt to acquire a lock by its key

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- key: string - a unique lock key to acquire
- ttl: number - a lock timeout (time to live) in milliseconds

**Returns:**
- err: Error - occured error or null for success
- result: boolean - lock result

### <a name="operation4"></a> acquireLock(correlationId, key, ttl, timeout, callback)

Makes multiple attempts to acquire a lock by its key within give time interval

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- key: string - a unique lock key to acquire
- ttl: number - a lock timeout (time to live) in milliseconds
- timeout: number - a lock acquisition timeout

**Returns:**
- err: Error - occured error or null for success

### <a name="operation5"></a> releaseLock(correlationId, key, callback)

Releases prevously acquired lock by its key

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- key: string - a unique lock key to release

**Returns:**
- err: Error - occured error or null for success

## <a name="client_http"></a> LocksHttpClientV1 class

LocksHttpClientV1 is a client that implements HTTP protocol

```typescript
class LocksHttpClientV1 extends CommandableHttpClient implements ILocksClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, result: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
```

**Constructor config properties:**
- connection: object -HTTP transport configuration options
  - protocol: string -HTTP protocol - 'http' or 'https'(default is 'http')
  - host: string -IP address / hostname binding(default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_http"></a> LocksDirectClientV1 class

LocksDirectClientV1 is a dummy client calls controller from the same container.
It can be used in monolytic deployments.

```typescript
class LocksDirectClientV1 extends DirectClient<any> implements ILocksClientV1 {
    constructor();
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, result: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
```

## <a name="client_http"></a> LocksNullClientV1 class

LocksNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice.
It can be useful in testing scenarios to cut dependencies on external microservices.

```typescript
class LocksNullClientV1 implements ILocksClientV1 {
    constructor();
    getLocks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, result: DataPage<LockV1>) => void): void;
    getLockById(correlationId: string, key: string, callback: (err: any, result: LockV1) => void): void;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    releaseLock(correlationId: string, key: string, callback: (err: any) => void): void;
}
```

