YU-Projects
===========


A small MEAN web app for the YU long-term projects 

## Pre-requisites

1. node.js: http://nodejs.org/
1. Ruby: http://www.ruby-lang.org
1. Compass: `$ gem update --system && gem install compass`
1. Yeoman: `$ npm install -g yo`
1. Angular-fullstack generator: `$ npm install generator-angular-fullstack`


## Dev guide

1. Clone this repository: `$ git clone https://github.com/ethanve/YU-Projects.git`
1. Go into the new directory `$ cd YU-Projects`
1. Install server packages: `$ npm install`
1. Install client packages: `$ bower install`
1. Run Grunt server: `$ grunt serve`


## Bower: static dependencies

Always install dependencies using **-S** in order to save it to `bower.json`:

    $ bower install -S <dependency>

And also, remember to update `index.html` with the newly installed dependency:

    $ grunt wiredep


## Yeoman Angular-Fullstack generator scaffolds
Whenever you want to create a new AngularJS component or and API endpoint, you can use these terminal commands to generate the scaffold. The `<a-z>` denotes the name of the component.

#####Server Side:
    $ yo angular-fullstack:endpoint <myEndpoint

#####Client Side:  
    $ yo angular-fullstack:route <myRoute>
    $ yo angular-fullstack:controller <myController>
    $ yo angular-fullstack:filter <myFilter>
    $ yo angular-fullstack:directive <myDirective>
    $ yo angular-fullstack:service <myService>
    $ yo angular-fullstack:factory <myFactory>
    $ yo angular-fullstack:provider <myProvider>
    $ yo angular-fullstack:decorator <myDecorator>
 
 