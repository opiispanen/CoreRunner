/*
 * Initizialize the few core variables for the CoreRunner:
 *  - scope, object that should contain app states or even variables
 *  - runnerCollection, an array of functions that will be run on runtime
 *  - Optional: frequency, how often the main loop runs. Default: 300ms, set
 *    to zero and let the browser run naturally (about 13ms for most). 
 */
var scope = {}, 
    runnerCollection = [],
    coreRunner = new CoreRunner(scope, runnerCollection, 0)
    // Optional: A way to handle similar templates
    templates = {
        checkBox: `<label><input type="checkbox" /></label>`
    },
    // Optional: An input element factory
    inputElement = function(label, parent, variableName) {
        /*
         * An example of a common object. The object propertynames
         * don't matter at all. Just use understandable names.
         * 
         * You can also freely add properties and use them in your
         * functions. Like the value variable here.
         * 
         * Also it's a good idea to format and handle your data
         * here before it goes to the scope object.
         */
        return {
            element: $(templates.checkBox),
            value: false,
            init: function() {
                var _this = this;
            
                this.element.append(label);
                
                $(parent).append(this.element);
                
                this.element.find('input').on('click', function() {
                    _this.value = $(this).is(":checked");
                });
                
                /* 
                 * This adds the object's run function to the
                 * runnerCollection with keeping it's "this" 
                 * reference.
                 * 
                 * Allows using for example this.value.
                 */ 
                runnerCollection.push(this.run.bind(this));
            },
            run: function(scope) {
                scope[variableName] = this.value;
            }
        };
    },
    /*
     * The objects that make everything happen.
     */
    objects = [
        inputElement(' Web development','.inputs','dev'),
        inputElement(' Design','.inputs','design'),
        inputElement(' Workshop','.inputs','workshop'),
        inputElement(' Maintenance','.extra','maintenance'),
        inputElement(' Changes development','.extra','changesDev'),
        inputElement(' Changes design','.extra','changesDesign'),
        inputElement(' Extras','.inputs','extra'),
        {
            // Element can also be already in the DOM
            element: $('.price-container'),
            init: function() {
                $('.displays').append(this.element);
                this.element.find('.per-month').hide();

                runnerCollection.push(this.run.bind(this));
            },
            /*
             * This component gets all the checkbox true/false
             * values and determines the prices and if the
             * monthly price should be visible.
             */
            run: function(scope) {
                var price = 0,
                    priceMonth = 0;
                
                if (scope.dev)
                    price += 6000;
                
                if (scope.design)
                    price += 3500;
                
                if (scope.workshop)
                    price += 360;

                if (scope.extra) {
                    if (scope.maintenance || scope.changesDev || scope.changesDesign)
                        this.element.find('.per-month').show();

                    if (!scope.maintenance && !scope.changesDev && !scope.changesDesign)
                        this.element.find('.per-month').hide();

                    if (scope.maintenance)
                        priceMonth += 150;

                    if (scope.changesDev)
                        priceMonth += 600;

                    if (scope.changesDesign)
                        priceMonth += 400;
                } else {
                    this.element.find('.per-month').hide();
                }
                
                price = parseFloat(price).toFixed(2);
                priceMonth = parseFloat(priceMonth).toFixed(2);  
                
                $(this.element).find('.price').html(price+' €');
                $(this.element).find('.pm-price').html(priceMonth+' €');
            }
        },
        // This component is a simple show/hide on state value -component
        {
            element: $('.extra'),
            init: function() {
                runnerCollection.push(this.run.bind(this));
            },
            run: function(scope) {
                if (scope.extra)
                    this.element.show();
                else
                    this.element.hide();
            }
        },
        {
            element: $('.btn.stop'),
            init: function() {
                $(this.element).on('click', function() {
                    // You can always start and stop the main loop
                    coreRunner.allowRun(false);
                });
            }
        },
        {
            element: $('.btn.start'),
            init: function() {
                $(this.element).on('click', function() {
                    coreRunner.allowRun(true);
                });
            }
        }
    ];

// Initizialize the objects
for (var i=0;i < objects.length;i++) {
    objects[i].init();
}