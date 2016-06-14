/**
 * Factory for a textureLoader component that
 * will load the given textures for the Three.js
 * animation.
 * 
 * When the textures are loaded the component will
 * set scope.readyState.textures to true and it's
 * job is done.
 * 
 * @param Object scope
 * @return Object
 */
function textureLoader(scope) {
    return {
        init: function() {
            var loadedTextures = 0,
            textures = [
                {
                    alias: 'logo',
                    path: 'images/logo.jpg'
                },
                {
                    alias: 'logoBump',
                    path: 'images/logo_bump.jpg'
                },
                {
                    alias: 'earth',
                    path: 'images/earthmap1k.jpg'
                },
                {
                    alias: 'earthBump',
                    path: 'images/earthbump1k.jpg'
                }
            ],
            loader = new THREE.TextureLoader(),
            loadTexture = function(texture) {
                loader.load(texture.path, 
                    function(_texture) {
                        scope.textures[texture.alias] = _texture;
                        loadedTextures++;
                        
                        if (loadedTextures === textures.length) {
                            scope.readyState.textures = true;
                        }
                    });
            };
                        
            for (i in textures) {
                loadTexture.call(this, textures[i]);
            }
        }
    };
}