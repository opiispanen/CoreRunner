# CoreRunner
CoreRunner is not a library or a framework, more like a frame with a philosophy.

The big idea is to have a bunch of independent components that can be:
  - DOM widgets
  - Data widgets
  - Animation
  - Canvas/WebGL game/animation, whatever
 
And all of these can work in unity having things like data-binding, ansyncronous events etc.

# Background

I've always done some game development and there's a lot stuff that can be
applied in other fields of software development. Javascript webapps have quite
the same kind of asynchronicity in how the application flow goes. 

So why not have a game loop and let the components/objects manage their states and behaviours
just like in games? The aim is to get rid of spaghetti code and improve maintainability.

This project has similar logic to my other project ThreeScenes.js which is a Three.js wrapper
for easier development.

Notice: This idea/project is just in its babysteps, so it might not be a good
idea to bind any real life business logic to it..

# Demos

1. [Basic dynamic view example](//viixet.com/CoreRunner/examples/dynamic_view_example/example1.html)
2. [WebGL example](//viixet.com/CoreRunner/examples/webgl_example/webglExample1.html)
3. [ES6 example 1](//viixet.com/CoreRunner/examples/es6example1/)
