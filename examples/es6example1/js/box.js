const box = {
    template: $('<div/>'),
    init: (scope, obj) => {
        let template = obj.template;

        scope.box = {
            directionRight: true,
            directionBottom: true,
            top: 0,
            left: 0,
            width: 200,
            height: 200
        };

        template.css({
            width: '200px',
            height: '200px',
            background: '#333',
            position: 'absolute',
            top: '0px',
            left: '0px'
        });

        $('html, body').css({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        });

        $('body').append(template);
    },
    run: (scope, obj) => {
        let template = obj.template.clone(),
            bounding = obj.template[0].getBoundingClientRect();

        navigation(scope.box, bounding, 'directionRight', 5);
        navigation(scope.box, bounding, 'directionBottom', 10);

        if (scope.keyboard.left && scope.box.width >= 15)
            scope.box.width -= 5;

        if (scope.keyboard.right && scope.box.width <= 500)
            scope.box.width += 5;

        if (scope.keyboard.up && scope.box.height >= 15)
            scope.box.height -= 5;

        if (scope.keyboard.down && scope.box.height <= 500)
            scope.box.height += 5;

        $(template).css({
            width: scope.box.width+'px',
            height: scope.box.height+'px',
            top: scope.box.top+'px',
            left: scope.box.left+'px'
        });

        obj.template.replaceWith(template);
        obj.template = template;
    }
};

function navigation(box, bounding, direction, step) {
    let boundingRight = 'right',
        boundingLeft = 'left',
        windowLimit = 'innerWidth',
        boxDirection = 'left';

    if (direction === 'directionBottom') {
        boundingRight = 'bottom';
        boundingLeft = 'top';
        windowLimit = 'innerHeight';
        boxDirection = 'top';
    }

    if (box[direction]) {
        if (bounding[boundingRight] >= window[windowLimit])
            box[direction] = false;

        box[boxDirection] += step;
    } else {
        if (bounding[boundingLeft] <= 0)
            box[direction] = true;

        box[boxDirection] -= step;
    }
}