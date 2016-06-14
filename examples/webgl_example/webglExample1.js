(function(canvasObject, textureLoader, spinner) {
    var scope = {
        readyState: {
            animation: false,
            textures: false
        },
        textures: {},
        settings: {}
    }, 
    runnerCollection = [],
    coreRunner = new CoreRunner(scope, runnerCollection, 0)
    templates = {
        spinner: `<div class="loader">Loading...</div>`,
        canvasContainer: `<div></div>`
    },
    objects = [
        spinner(scope, runnerCollection, templates),
        textureLoader(scope),
        canvasObject(scope, runnerCollection, templates)
    ];

    for (var i=0;i < objects.length;i++) {
        objects[i].init();
    }

})(canvasObject, textureLoader, spinner);