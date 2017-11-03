module.exports = function(){
    StructureSpawn.prototype.buildRoadsToSources = function(){
        let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);

        for(let source of sources){
            this.pos.buildRoadTo(source.pos);
        }
    };
};

