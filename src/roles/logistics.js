module.exports = {
    name: 'logistics',
    run: function(creep){
        if(!creep.state)
            creep.state = 'gathering';

        if(creep.state == 'gathering'){
            let spawn = creep.room.find(FIND_MY_SPAWNS)[0]
            let result = creep.withdraw(spawn, RESOURCE_ENERGY);
            if(result == ERR_NOT_IN_RANGE)
                creep.moveTo(spawn,{visualizePathStyle: {stroke: '#ddd'}});
            if(creep.isFull)
                creep.state = 'distributing';
        }
        if(creep.state == 'distributing'){
            if(creep.carry.energy == 0){
                creep.state = 'gathering';
                return;
            }
            if(!creep.memory.target){
                let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,{filter: function(ext){
                    return (ext.structureType == STRUCTURE_EXTENSION && ext.energy < ext.energyCapacity);
                }});

                let result = creep.transfer(target, RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE)
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#ddd'}});

                //console.log("distributing to extension " + target.id);
            }
        }
    },
    body: function(){return [WORK, MOVE, CARRY];},
    max: 1
};