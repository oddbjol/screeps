let MAX_HARVESTERS_PER_SOURCE = 3;

module.exports = {

roles: 
[
    {
        role: 'harvester',
        body: [WORK, WORK, WORK, MOVE, CARRY],
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
    
    for(let roleObj of this.roles){
        if(this.numOfRole(roleObj.role) < roleObj.max && !spawn.spawning){
            // Spawn is free, and we need more of this role.
            
            if(roleObj.role == 'harvester'){
                let source = this.findFreeSource();
                if(source){
                    let result = spawn.spawnCreep(roleObj.body, roleObj.role + Game.time, {memory:{role: roleObj.role, sourceID: source.id}});
                    console.log("Tried spawning harvester to " + source.id + " with result " + result);
                    if(result >= 0)
                        Memory["source_"+source.id] = Memory["source_"+source.id] + 1;
                }
            } 
            else{
                spawn.spawnCreep(roleObj.body, roleObj.role + Game.time, {memory:{role: roleObj.role}});
            }
            
        }
            
    }
},

findFreeSource: function(){
    let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);
    
    for(let source of sources){
        if(!Memory["source_"+source.id]){
            Memory["source_"+source.id] = 0;
        }
            
        let num = Memory["source_"+source.id]; //Memory.sources[source.id].numHarvesters;
        
        if(num < MAX_HARVESTERS_PER_SOURCE)
            return source;
    }
    
    return null;
},

numOfRole: function(role){
    let creepsWithRole = _.filter(Game.creeps,function(creep){return (creep.memory.role == role);});
    return creepsWithRole.length;
    
}

};