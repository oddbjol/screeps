"use strict";

let harvester = require('roles.harvester');
let builder = require('roles.builder');
let upgrader = require('roles.upgrader');
let logistics = require('roles.logistics');

module.exports =
{
    roles: {
        upgrader: upgrader,
        builder: builder,
        logistics: logistics,
        harvester: harvester
    },
    processAll: function(){
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];

            this.roles[creep.memory.role].run(creep);
        }
    }
};