/**
 * @author Otto Piispanen otto.piispanen@gmail.com
 */
class CoreRunner {
    /**
     * @param {object} scope 
     * @param {array} runnerCollection 
     * @param {number} [frequency, optional variable]
     */
    constructor(scope, runnerCollection) {
        this.lastRun = 0;
        this.updateAllowed = true;
        this.frequency = typeof arguments[2] === 'number' ? arguments[2] : 300;
        this.scope = scope;
        this.runnerCollection = runnerCollection;
        this.events = typeof EventSystem === 'function' ? new EventSystem() : undefined;

        this.run();
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
                    let returnVal = runnerCollection[i](this.scope);

                    if (returnVal === false)
                        runnerCollection.splice(i, 1);
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
}
