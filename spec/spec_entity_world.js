
// Node tests
var buster = require("buster");
var entityWorld = require("../lib/entity_world.js");

buster.testCase("A module", {
  "states the obvious": function () {
    assert(true);
  }
});

buster.spec.expose();

describe("EntityWorld", function() {
    it("should update it's entities", function() {
        entities = new Array();
        for(var i = 0; i < 10; ++i) {
            entity = new Entity();
            this.stub(entity, "update");
            entities.push(entity);
        }

        world = new EntityWorld(entities);
        world.update();

        entities.forEach(function(entity) {
            assert.calledOnce(entity.update);
        });
    });
});

describe("Entity", function(){
    it("should update it's behaviors", function() {
        behaviors = new Array()
        for(var i = 0; i < 10; ++i) {
            behavior = new Behavior();
            this.stub(behavior, "update");
            behaviors.push(behavior);
        }

        entity = new Entity(behaviors);
        entity.update();

        behaviors.forEach(function() {
            assert.calledOnce(behavior.update);
        });
    });
});
