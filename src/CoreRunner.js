/*
 * @author Otto Piispanen otto.piispanen@gmail.com
 * 
 * @param Object scope
 * @param array runnerCollection
 * @param number arguments[2] Optional variable
 */
function CoreRunner(scope, runnerCollection) {
    this.lastRun = 0;
    this.updateAllowed = true;
    this.frequency = typeof arguments[2] === 'number' ? arguments[2] : 300;
    this.scope = scope;
    this.runnerCollection = runnerCollection;

    this.run();
}

CoreRunner.prototype = {
    run: function() {
        if (!this.updateAllowed)
            return;

        requestAnimationFrame(this.run.bind(this));

        if (Date.now() - this.lastRun >= this.frequency) {
            var runnerCollection = this.runnerCollection,
                i = runnerCollection.length;

            if (i) {
                while (i--) {
                    runnerCollection[i](this.scope);
                }
            }

            this.lastRun = Date.now();
        }
        
    },
    allowRun: function(allow) {
        var oldVal = this.updateAllowed;
        
        this.updateAllowed = allow;
        
        if (!oldVal && allow)
            this.run();
    }
};