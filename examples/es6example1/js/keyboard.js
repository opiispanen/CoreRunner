const keyboard = {
    init: (scope, obj) => {
        let map = {
            38: 'up',
            40: 'down',
            37: 'left',
            39: 'right'
        };

        scope.keyboard = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        $('body').on('keydown', (evt) => {
            let key = map[evt.keyCode];

            scope.keyboard[key] = true;
        });

        $('body').on('keyup', (evt) => {
            let key = map[evt.keyCode];

            scope.keyboard[key] = false;
        });
    }
};