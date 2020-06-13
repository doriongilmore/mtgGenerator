
class Pool {

    constructor(delay = 100) {
        this.DELAY = delay;
        this.pool = [];
        this.lastCall = Date.now() - this.DELAY;
        this.actualCall = null;
    }

    isBusy() {
        return !!this.actualCall || (this.lastCall + this.DELAY) > Date.now();
    }

    addToPool(boundPromise, callback) {
        this.pool.push({ promise: boundPromise, callback });
        this.executeNextCall();
    }
    executeNextCall() {
        if (this.isBusy()) {
            return;
        }
        const obj = this.pool.shift();
        if (obj) {
            this.lastCall = Date.now();
            this.actualCall = obj.promise().then((res) => {
                // const callDuration = Date.now() - this.lastCall;
                this.actualCall = null;
                setTimeout(this.executeNextCall.bind(this), this.DELAY);
                obj.callback(res);
            });
        }
    }
}
module.exports = Pool;
