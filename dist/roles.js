module.exports = 
{
    builder: function(creep){
        
        
        renew(creep);
        
        if(creep.memory.building){
            let sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        
            if(sites){
                let site = sites[0];
                let result = creep.build(site);
                if(result == ERR_NOT_IN_RANGE)
                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ddd'}});
                else if(result == ERR_NOT_ENOUGH_RESOURCES){
                    creep.say("get energy!");
                    creep.memory.building = false;
                }
                    
            }
        }
        else{
            if(creep.carry.energy == creep.carryCapacity){
                creep.memory.building = true;
                creep.say("build!");
            }
                
            else{
                let source = creep.room.find(FIND_MY_SPAWNS)[0];
                let result = creep.withdraw(source, RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE)
                    creep.moveTo(source,{visualizePathStyle: {stroke: '#ddd'}});
                else if(result < 0)
                    console.log("Error: " + creep.name + " tried to withdraw energy from " + source + " with error " + result);
            }
        }
        

    },
    
    harvester: function(creep){
        
        renew(creep);
        
        if(creep.carry.energy < creep.carryCapacity){
            
            let source = Game.getObjectById(creep.memory.sourceID);
            
            let result = creep.harvest(source);
            //console.log(creep.name + " harvesting from " + sources[0] + " with result " + result);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ddd'}});
            
        }
        else{
            //console.log(creep.name + " is trying to return with his stuff");
            let structs = creep.rom.find(FIND_MY_STRUCTURES);
            let dests = _.filter(structs, function(struct){return struct.RAMPART_HITS})
            let result = creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
            //console.log(creep.name + " deposited energy into Spawn1 with result " + result);
            if(result == ERR_NOT_IN_RANGE){
                let result = creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ddd'}});
                
                //console.log(creep.name + " is trying to move to spawn with result " + result);
            }
                
        }
    },
    
    upgrader: function(creep){
        
        renew(creep);
        
        
        if(creep.memory.upgrading){
            let result = creep.upgradeController(creep.room.controller);
            
            if(result == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ddd'}});
            else if(result == ERR_NOT_ENOUGH_RESOURCES){
                creep.memory.upgrading = false;
                creep.say("get energy!");
            }
            else if(result < 0){
                creep.say("?!");
                console.log("Error: " + creep.name + " tried upgrading controller with error " + result);
            }
                
        }
        else{
            if(creep.carry.energy == creep.carryCapacity){
                creep.memory.upgrading = true;
                creep.say("upgrade!");
            }
                
            else{
                let source = creep.room.find(FIND_MY_SPAWNS)[0];
                let result = creep.withdraw(source, RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE)
                    creep.moveTo(source,{visualizePathStyle: {stroke: '#ddd'}});
                else if(result < 0)
                    console.log("Error: " + creep.name + " tried to withdraw energy from " + source + " with error " + result);
            }
        }
    },
    
    warrior: function(creep){
        
        renew(creep);
        
        //console.log(creep.name + " is a warrior.");
    }
    
};

function renew(creep){
    let spawn = creep.room.find(FIND_MY_SPAWNS)[0];
    if(creep.ticksToLive < 200 && creep.pos.inRangeTo(spawn, 1)){
        let result = spawn.renewCreep(creep);
        if(result < 0)
            creep.say("renew " + result);
        else
            creep.say("renew");
    }
}