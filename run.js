var fs = require('fs');
var yaml = require('js-yaml');

var configuration = {
  entityConfigurations: './config.yaml'
};
var path = process.argv[2];
if(!path) { 
  path = configuration.entityConfigurations;
}

console.log('Loading configuration from (' + path + ').');

var fileContents = fs.readFileSync(path);
console.log(fileContents.toString());
var configuration = yaml.load(fileContents.toString());
if(!configuration) {
  throw new Error('Failed to load configuration.');
}
console.log('Finished loading configuration.');

require('./lib/entity_world.js');

// Load entities.
entityConfigurations = configuration.entities;
if(!entityConfigurations) {
  throw new Error('Configuration requires an entities configuration.');
}
var entities = new Array();
entityConfigurations.forEach(function(configuration) {
  console.log(configuration);
  var behaviorConfigurations = configuration.behaviors;
  var behaviors = new Array();
  behaviorConfigurations.forEach(function(configuration) {
    var behavior = new Behavior(configuration);
    behaviors.push(behavior);
  });
  entities.push(new Entity(behaviors));
});

var entityWorld = new EntityWorld(entities);

/*
var entityWorld = new EntityWorld(function() {
  // TODO: Load entities...
  entities = new Array();
  return entities;
});
*/

// main loop
// TODO: should probably be a set timeout or the like. while 1 crushes cpus
while(1) {
  // TODO: no kbd input, all io is 0MQ messages

  entityWorld.update();
}

// or...
// Totally functional? When run_world exits, we're done.
//runWorld(createEntities(createBehaviors(fetchConfiguration(configurationSource))));

return 0;

