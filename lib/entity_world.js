EntityWorld = function (entities) {
  this._entities = entities;
};

EntityWorld.prototype.update = function() {
  this._entities.forEach(function(entity) {
    entity.update(this);
  });
};


Entity = function(behaviors) {
  this._behaviors = behaviors;
};

Entity.prototype.update = function(world) {
  this._behaviors.forEach(function(behavior) {
    behavior.update(this);
  });
};


Behavior = function() {
};

Behavior.prototype.update = function(entity) {
};
