let roles = require('roles');

let spawner = require('spawner');
//tes
module.exports.loop = function(){
    
    clearCreepMemory();
    
    for(var creepName in Game.creeps){
        let creep = Game.creeps[creepName];
        
        roles[creep.memory.role](creep);
    }
    spawner.tick();
    
    function clearCreepMemory(){
        for(var creep in Memory.creeps){
            if(!Game.creeps[creep]){
                let sourceID = Memory.creeps[creep].sourceID;
                if(sourceID) {
                    Memory["source_" + sourceID] = Memory["source_" + sourceID] - 1;
                }
                delete Memory.creeps[creep];
            }
        }
    }
};