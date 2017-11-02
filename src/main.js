"use strict";

let roles = require('roles');
let spawner = require('spawner');
let util = require('util');

if (!Memory.started) {
    util.setUp();
    Game.spawns.Spawn1.buildRoadsToSources();

    Memory.sources = {};
    for(let source of Game.spawns['Spawn1'].room.find(FIND_SOURCES))
        Memory.sources[source.id] = {spotsInUse: 0, totalSpots: source.numFreeSpots()};

    Memory.started = true;
}

module.exports.loop = function () {

    clearCreepMemory();

    for (var creepName in Game.creeps) {
        let creep = Game.creeps[creepName];

        roles[creep.memory.role](creep);
    }
    spawner.tick();

    function clearCreepMemory() {
        for (var creep in Memory.creeps) {
            if (!Game.creeps[creep]) {
                let sourceID = Memory.creeps[creep].sourceID;
                if (sourceID) {
                    Memory.sources[sourceID].spotsInUse--;
                }

                delete Memory.creeps[creep];
            }
        }
    }
};
