let role = require('role');
let spawner = require('spawner');
let library = require('library.library');
let planner = require('planner');
let generic_creep = require("roles.creep");

library();

if (!Memory.started) {

    Game.spawns.Spawn1.buildRoadsToSources();

    Memory.sources = {};
    for(let source of Game.spawns['Spawn1'].room.find(FIND_SOURCES)){
        Memory.sources[source.id] = {};
        source.spotsInUse = 0;
        source.totalSpots = source.numFreeSpots();
    }

    Memory.started = true;
}

module.exports.loop = function () {

    checkCreepDeath();

    planner();

    role.processAll();

    spawner.tick();

    function checkCreepDeath() {
        for (let creep_name in Memory.creeps) {
            if (!Game.creeps[creep_name]) {
                let role_name = Memory.creeps[creep_name].role
                if(role.roles[role_name].death)
                    role.roles[role_name].death(creep_name);
                generic_creep.death(creep_name);
            }
        }
    }
};
