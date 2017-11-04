module.exports = {
    name: 'builder',
    run: function(creep){
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
    body: function(){return [WORK, MOVE, CARRY];},
    max: 0
};