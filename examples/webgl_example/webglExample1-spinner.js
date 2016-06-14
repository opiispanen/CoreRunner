/**
 * Pretty straigthforward factory for a simple
 * css spinner.
 * 
 * @param Object scope
 * @param array runnerCollection 
 * @param array templates
 * @return Object
 */
function spinner(scope, runnerCollection, templates) {
    return {
        element: $(templates.spinner),
        loading: true,
        init: function () {
            $('.canvas-container').append(this.element);

            this.destroyrun = (function(i) {
                return function() {
                    runnerCollection.splice(i, 1);
                };
            })(runnerCollection.length - 1);
            
            runnerCollection.push(this.run.bind(this));
        },
        /*
         * When the animation is ready to play, hide the spinner.
         *  - also check that the spinner is indeed visible,
         *    otherwise the element is trying to hide itself 
         *    60 times per second
         */
        run: function(scope) {  
            if (scope.readyState.animation 
                    && this.element.is(":visible")) {
                this.element.hide();
            }
        }
    };
}