module.exports = {
    name: 'harvester',
    death: function(creep_name){
        console.log("harvester" + creep_name + " has died!");
        let sourceID = Memory.creeps[creep_name].sourceID;
        Memory.sources[sourceID].spotsInUse--;
    },
    run: function(creep){
        if(!creep.isFull){

            let source = Game.getObjectById(creep.memory.sourceID);

            let result = creep.harvest(source);
            //console.log(creep.name + " harvesting from " + sources[0] + " with result " + result);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ddd'}});

        }
        else{
            //console.log(creep.name + " is trying to return with his stuff");
            let result = creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
            //console.log(creep.name + " deposited energy into Spawn1 with result " + result);
            if(result == ERR_NOT_IN_RANGE){
                let result = creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ddd'}});
            }

        }
    },
    body: [WORK, MOVE, CARRY],
    max: 100,
    spawn: function(spawn){
        let source = spawn.room.findFreeSource();
        if(source){
            let result = spawn.spawnCreep(this.body, this.name + Game.time, {memory:{role: this.name, sourceID: source.id}});
            if(result >= 0){
                source.spotsInUse++;
                return true; // We have spawned something, we are done.
            }
            if(result != ERR_NOT_ENOUGH_ENERGY)
                console.log("Tried spawning " + this.name + " to " + source.id + " with error " + result);
        }
    }
};