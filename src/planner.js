"use strict";

module.exports = function(){
    if(Game.time % 10 != 0) // Check for new plans only so often
        return;

    for(const spawn_name in Game.spawns){
        let spawn = Game.spawns[spawn_name];
        console.log("planning for spawn " + spawn.name);
    }
};