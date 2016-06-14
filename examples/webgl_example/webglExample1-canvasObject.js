/**
 * Factory function for a ThreeScenes.js (uses Three.js) component
 * 
 * @param Object scope
 * @param array runnerCollection 
 * @param array templates
 * @return Object
 */
function canvasObject(scope, runnerCollection, templates) {
        
    return {
        element: $(templates.canvasContainer),
        init: function() {
            $('.canvas-container').append(this.element);
            
            runnerCollection.push(this.run.bind(this));
        },
        canPlay: false, // wait until the rendering can start
        textures: [], // textureLoader -component provides these textures
        render: function() {}, // empty function waiting to be replaced
        initScene: function() {
            var textures = this.textures,
                helper = _3helper;
                
            /*
             * A ThreeScenes instance, another project of mine.
             * Quite alike with the CoreRunner.js but initizializes
             * a Three.js scene with ease.
             * 
             * The ThreeScenes constructor returns the rendering function
             * that we use in the "run" function 
             */
            this.render = _3s({
                elem: this.element[0],
                size: {
                    width: $('.canvas-container').width(),
                    height: $('.canvas-container').width() * (9/16)
                },
                autoPlay: false,
                camera: { x: 0, y: 130, z: 150 },
                objects: [
                    {
                        elem: new THREE.AmbientLight( 0x040404 )
                    },
                    {
                        elem: new THREE.SpotLight( 0xffffff ),
                        init: function() {
                            this.elem.position.set( 400, 1000, 400 );
                        }
                    },
                    {
                        elem:  new THREE.Object3D(),
                        init: function() {
                            this.elem.rotation.y = helper.degToRad(15);
                            
                            var material = new THREE.MeshPhongMaterial( { 
                                    map: textures.logo, 
                                    bumpMap: textures.logoBump, 
                                    bumpScale: 4.45 
                                }),
                                geometry = new THREE.BoxGeometry(100,100,100),
                                box = new THREE.Mesh(geometry, material);
                            
                            this.elem.add(box);
                        },
                        anim: function() {
                            this.elem.rotation.y += helper.degToRad(0.5);
                        }
                    },
                    {
                        elem:  new THREE.Object3D(),
                        theta: -45,
                        init: function() {
                            this.elem.rotation.y = helper.degToRad(15);
                            
                            var material = new THREE.MeshPhongMaterial( { 
                                    map: textures.earth, 
                                    bumpMap: textures.earthBump, 
                                    bumpScale: 12 
                                }),
                                geometry = new THREE.SphereGeometry( 55, 32, 32 ),
                                box = new THREE.Mesh(geometry, material);
                            
                            this.elem.position.set(400 * Math.cos(this.theta),0,400 * Math.sin(this.theta));

                            this.elem.add(box);
                        },
                        anim: function() {
                            this.theta -= 0.001;
                            this.elem.rotation.y += helper.degToRad(0.25);
                            this.elem.position.set(400 * Math.cos(this.theta),0,400 * Math.sin(this.theta));
                        }
                    }
                ]
            });

            scope.readyState.animation = true;
        },
        run: function(scope) {
                /*
                 *  - Wait till the needed readyStates are true
                 *      - here only the textures
                 *  - Set the canPlay variable true
                 *  - Fill up the textures
                 *  - Run the actual initialization function
                 */
                if (scope.readyState.textures && !this.canPlay) {
                    this.canPlay = true;
                    this.textures = scope.textures;
                    this.initScene();
                }

            if (this.canPlay)
                this.render();
        }
    };
};