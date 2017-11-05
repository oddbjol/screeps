//comment
let role = require('role');
let spawner = require('spawner');
let library = require('library.library');
let planner = require('planner');
let generic_creep = require("roles.creep");

library();

if (!Memory.started) {

    //Game.spawns.Spawn1.buildRoadsToSources();

    Memory.sources = {};
    for(let source of Game.spawns['Spawn1'].room.find(FIND_SOURCES)){
        Memory.sources[source.id] = {};
        source.spotsInUse = 0;
        source.totalSpots = source.numFreeSpots();
    }

    Memory.started = true;
}

module.exports.loop = function () {

    // for(let i = 0; i < 20; i++){
    //     let tile = Game.spawns.Spawn1.getBlock(i);
    //     Game.spawns.Spawn1.room.visual.rect(tile, 3, 3);
    //     Game.spawns.Spawn1.room.visual.text(i,tile.x + 1.5, tile.y+1.5,{font: '1.5 Serif'});
    // }

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
