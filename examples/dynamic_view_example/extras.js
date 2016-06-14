var elements = [
    {
        element: $(templates.input),
        value: '',
        init: function() {
            var _this = this;
            $('.inputs').append(this.element);

            this.element.on('keyup', function() {
            _this.value = $(this).val();
            });
            
            checkFuncs.push(this.checker.bind(this));
        },
        checker: function(scope) {
            scope.deal = this.value;
        }
        },
        {
        element: $(templates.display),
        init: function() {
            $('.displays').append(this.element);
            checkFuncs.push(this.checker.bind(this));
        },
        checker: function(scope) {
            if (typeof scope.deal !== 'undefined')
                this.element[0].innerHTML = scope.deal;
        }
    }
];