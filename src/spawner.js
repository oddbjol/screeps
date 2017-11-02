"use strict";

let role = require("role");
let generic_creep = require("roles.creep");

const SPAWN_INTERVAL = 1;

module.exports = {

tick: function(){
    
    let spawn = Game.spawns['Spawn1'];


    // Show some info about the creep being spawned.
    if(spawn.spawning){
        spawn.room.visual.text("🛠 " + spawn.spawning.name, spawn.pos.x, spawn.pos.y+1, {font: '0.7 serif', stroke:'1px black'});
        return; // Don't spawn if already spawning.
    }

    // Only spawn every so often.
    if(Game.time % SPAWN_INTERVAL != 0)
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