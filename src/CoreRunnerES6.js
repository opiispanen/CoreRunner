/**
 * @author Otto Piispanen otto.piispanen@gmail.com
 */
class CoreRunner {
    /**
     * @param {object} scope 
     * @param {array} runnerCollection 
     * @param {number} [frequency, optional variable]
     */
    constructor(scope = {}, runnerCollection = [], frequency = 0) {
        this.lastRun = 0;
        this.updateAllowed = true;
        this.frequency = frequency;
        this.scope = scope;
        this.runnerCollection = runnerCollection;
        this.events = typeof EventSystem === 'function' ? new EventSystem() : undefined;
    }

    run() {
        if (!this.updateAllowed)
            return;

        requestAnimationFrame(this.run.bind(this));

        if (Date.now() - this.lastRun >= this.frequency) {
            let runnerCollection = this.runnerCollection,
                i = runnerCollection.length;
                
            if (i) {
                while (i--) {
                    if (typeof runnerCollection[i].run === 'function') {
                        let returnVal = runnerCollection[i].run(this.scope, runnerCollection[i]);

                        if (returnVal === false)
                            runnerCollection.splice(i, 1);
                    }
                }
            }

            this.lastRun = Date.now();
        }
    }

    allowRun(allow) {
        let oldVal = this.updateAllowed;
        
        this.updateAllowed = allow;
        
        if (!oldVal && allow)
            this.run();
    }

    addRunner(runner) {
        let newId = this.runnerCollection.length;

        runner.id = newId;
        this.runnerCollection.push(runner);

        return newId;
    }

    removeRunner(id) {
        return this.runnerCollection.splice(id, 1);
    }

    init() {
        let runners = this.runnerCollection;

        for (let i=0;i < runners.length;i++) {
            if (typeof runners[i].init === 'function')
                runners[i].init(this.scope, runners[i]);
        }

        this.run();
    }
}