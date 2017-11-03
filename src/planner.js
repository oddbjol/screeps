const MAX_BLOCKS = 3;

module.exports = function(){
    if(Game.time % 10 == 0 && spawn.room.controller.level >= 2){
        for(const spawn_name in Game.spawns){
            let spawn = Game.spawns[spawn_name];
            console.log("planning for spawn " + spawn.name);
            if(spawn.blocksPlaced < MAX_BLOCKS)
                spawn.addBlock();
        }
    }

};