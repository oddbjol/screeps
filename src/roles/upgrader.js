let generic_creep = require("roles.creep");

module.exports = {
    name: 'upgrader',
    run: function(creep){
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
    body: function(){return [WORK, MOVE, CARRY];},
    max: 0,
    spawn: function(spawn){
        if(spawn.room.controller.level < 2)
            generic_creep.spawn(spawn, this);
    }
};