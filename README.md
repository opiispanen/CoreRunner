# CoreRunner
CoreRunner is not a library or a framework, more like a frame with a philosophy.

The big idea is to have a bunch of independent components that can be:
  - DOM widgets
  - Data widgets
  - Animation
  - Canvas/WebGL game/animation, whatever
 
And all of these can work in unity having things like data-binding, ansyncronous events etc.

#Background

I've always done some game development and there's a lot stuff that can be
applied in other fields of software development. Javascript webapps have quite
the same kind of asynchronicity in how the application flow goes. So why not have
a game loop and let the components/object manage their states and behaviours
just like in games?

Notice: This idea/project is just in its babysteps, so it might not be a good
idea to bind any real life business logic to it..
