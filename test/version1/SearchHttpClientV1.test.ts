let assert = require('chai').assert;
let async = require('async');

import { Descriptor, IdGenerator } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger, LogLevel } from 'pip-services3-components-node';

import { LocksMemoryPersistence } from 'pip-services-locks-node';
import { LocksController } from 'pip-services-locks-node';
import { LocksHttpServiceV1 } from 'pip-services-locks-node';
import { ILocksClientV1 } from '../../src/version1/ILocksClientV1';
import { LocksHttpClientV1 } from '../../src/version1/LocksHttpClientV1';
import { LocksClientFixtureV1 } from './LocksClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LocksHttpServiceV1', () => {
    let service: LocksHttpServiceV1;
    let client: LocksHttpClientV1;
    let fixture: LocksClientFixtureV1;

    setup((done) => {
        let logger = new ConsoleLogger();
        logger.setLevel(LogLevel.None);

        let persistence = new LocksMemoryPersistence();
        let controller = new LocksController();
        let client_id = IdGenerator.nextLong();
        let admin_id = IdGenerator.nextLong();
        
        service = new LocksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-locks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-locks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-locks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        controller.configure(ConfigParams.fromTuples(
            'options.release_own_locks_only', true,
            'options.release_admin_id', admin_id
        ));

        service.setReferences(references);

        client = new LocksHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new LocksClientFixtureV1(client, client_id, admin_id);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, done);
        });
    });

    test('TryAcquireLock', (done) => {
        fixture.testTryAcquireLock(done);
    });

    test('AcquireLock', (done) => {
        fixture.testAcquireLock(done);
    });

});
