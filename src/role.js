"use strict";

let harvester = require('roles.harvester');
let builder = require('roles.builder');
let upgrader = require('roles.upgrader');

module.exports =
{
    roles: {
        harvester: harvester,
        builder: builder,
        upgrader: upgrader
    },
    processAll: function(){
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];

            this.roles[creep.memory.role].run(creep);
        }
    }
};