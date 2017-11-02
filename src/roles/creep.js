module.exports = {
    name: 'generic creep',
    death: function(creep_name){
        delete Memory.creeps[creep_name];
    },
    spawn: function(spawn, role){
        let result = spawn.spawnCreep(role.body, role.name + Game.time, {memory:{role: role.name}});
        if(result >= 0)
            return true; // We have spawned something, we are done.
        console.log("Tried spawning " + role.name + " with result " + result);
    }
};