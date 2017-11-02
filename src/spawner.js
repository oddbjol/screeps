"use strict";

module.exports = {

roles: 
[
    {
        role: 'harvester',
        body: [WORK, MOVE, CARRY],
        max: 6
    },
    {
        role: 'warrior',
        body: [MOVE, MOVE, ATTACK],
        max: 0
    },
    {
        role: 'builder',
        body: [WORK, MOVE, CARRY],
        max: 1
    },
    {
        role: 'upgrader',
        body: [WORK, MOVE, CARRY],
        max: 2
    }
],

tick: function(){
    
    let spawn = Game.spawns['Spawn1'];

    let spawned = false; // Did we already initiate spawning this tick? spawn.spawning is too slow to update

    for(let roleObj of this.roles){
        if(this.numOfRole(roleObj.role) < roleObj.max && !spawned){
            // Spawn is free, and we need more of this role.

            if(roleObj.role == 'harvester'){
                let source = spawn.room.findFreeSource();
                if(source){
                    let result = spawn.spawnCreep(roleObj.body, roleObj.role + Game.time, {memory:{role: roleObj.role, sourceID: source.id}});
                    console.log("Tried spawning " + roleObj.role + " to " + source.id + " with result " + result);
                    console.log("spawn.spawning: " + spawn.spawning);
                    if(result >= 0){
                        source.spotsInUse++;
                        spawned = true;
                    }
                        
                }
            } 
            else{
                let result = spawn.spawnCreep(roleObj.body, roleObj.role + Game.time, {memory:{role: roleObj.role}});
                if(result >= 0)
                    spawned = true;
                console.log("Tried spawning " + roleObj.role + " to with result " + result);
            }
            
        }
            
    }
},

numOfRole: function(role){
    let creepsWithRole = _.filter(Game.creeps,function(creep){return (creep.memory.role == role);});
    return creepsWithRole.length;
    
}

};