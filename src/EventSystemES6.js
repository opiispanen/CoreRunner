/**
 * @author Otto Piispanen otto.piispanen@gmail.com
 */
class EventSystem {    	
    constructor() {
        this.events = [];
    }
    
    on(eventName, callable) {
        let wipeOut = !!arguments[2],
            eventDestroyed = false,
            i;

        if (typeof this.events[eventName] === 'undefined' || wipeOut)
            this.events[eventName] = [ callable ];
        else
            this.events[eventName].push(callable);
            
        i = this.events[eventName].length - 1;
        
        return () => {
            if (!eventDestroyed) {
                var event = this.events[eventName];
                event.splice(i, 1);
                eventDestroyed = true;
            }
        };
    }

    clear(eventName) {
        delete this.events[eventName];
    }

    trigger(eventName) {
        let _arguments = [].slice.call(arguments),
            callables = this.events[eventName] || [];

        _arguments.shift();

        callables.forEach(function(callable) {
            callable.apply(window, _arguments);
        });
    }
}