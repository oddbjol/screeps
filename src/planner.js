const MAX_BLOCKS = 1;

module.exports = function(){

    if(Game.time % 10 == 0){
        for(const spawn_name in Game.spawns){
            let spawn = Game.spawns[spawn_name];
            if(spawn.blocksPlaced < MAX_BLOCKS && spawn.room.controller.level >= 2)
                spawn.addBlock();
        }
    }

};