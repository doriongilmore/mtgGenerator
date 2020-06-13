describe('Pool Util Class Tests', () => {
    let Pool;
    let sandbox;
    let clock;
    let expect;
    before(() => {
        Pool = require('../../src/utils/Pool');
        const sinon = require('sinon');
        const chai = require('chai');
        expect = chai.expect;
        sandbox = sinon.createSandbox();
        clock = sinon.useFakeTimers();
    });
    after(() => {
        sandbox.restore();
        clock.restore();
    });

    describe('addToPool method', () => {
        const delay = 10;
        let pool;
        beforeEach(() => {
            pool = new Pool(delay);
            sandbox.spy(pool, 'executeNextCall');
        });
        afterEach(() => {
            clock.tick(10 * delay); // release pending timeouts
            sandbox.resetHistory();
        });

        it('should call executeNextCall if empty pool', () => {
            const callback = () => {};

            pool.addToPool(Promise.resolve.bind(Promise, null), callback);

            expect(pool.executeNextCall.callCount).equal(1);
        });

        it('should be busy if severak calls in a row', () => {
            const callback = () => {};

            pool.addToPool(Promise.resolve.bind(Promise, null), callback);
            clock.tick(1);
            pool.addToPool(Promise.resolve.bind(Promise, null), callback);

            expect(pool.isBusy()).equal(true);
        });

        it('should empty pool after some time', () => {
            const callback = () => {
                expect(pool.pool.length).not.equal(0);
                clock.tick(delay + 1);
            };
            const finalCallback = () => {
                expect(pool.pool.length).equal(0);
            };
            pool.addToPool(Promise.resolve.bind(Promise, null), callback);
            pool.addToPool(Promise.resolve.bind(Promise, null), callback);
            pool.addToPool(Promise.resolve.bind(Promise, null), finalCallback);
        });
    })

});
