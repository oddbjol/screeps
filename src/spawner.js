"use strict";

let role = require("role");
let generic_creep = require("roles.creep");

const SPAWN_INTERVAL = 1;

module.exports = {

tick: function(){
    
    let spawn = Game.spawns['Spawn1'];

    // Don't spawn if already spawning, only spawn every so often.
    if(spawn.spawning || Game.time % SPAWN_INTERVAL != 0)
        return;

    for(let roleName in role.roles){
        let roleObj = role.roles[roleName];
        if(this.numOfRole(roleObj.name) < roleObj.max){
            // Spawn is free, and we need more of this role.

            let spawned;
            if(roleObj.spawn)
                spawned = roleObj.spawn(spawn);
            else
                spawned = generic_creep.spawn(spawn, roleObj);

            if(spawned)
                return; // Done spawning this tick.
        }
            
    }
},

numOfRole: function(role){
    let creepsWithRole = _.filter(Game.creeps,function(creep){return (creep.memory.role == role);});
    return creepsWithRole.length;
    
}

};