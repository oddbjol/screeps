module.exports = function(){
    RoomPosition.prototype.getSurroundingTiles = function(){
        let tiles = [];
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                //skip the middle tile
                if(x == 0 && y == 0)
                    continue;

                tiles.push(new RoomPosition(this.x+x, this.y+y, this.roomName));
            }
        }
        return tiles;
    };

    RoomPosition.prototype.hasNaturalWall = function(){
        return this.look().filter(obj => obj.type=='terrain').some(obj => obj.terrain === "wall");
    };

    RoomPosition.prototype.buildRoadTo = function(pos){
        this.buildStructureTo(pos, STRUCTURE_ROAD);
    };

    RoomPosition.prototype.buildStructureTo = function(pos, struct_type){
        let path = this.findPathTo(pos);
        for(let p of path){
            let result = Game.spawns.Spawn1.room.createConstructionSite(p.x, p.y, struct_type);
        }
    };

    RoomPosition.prototype.walkable = function(){
        let objects = this.look();
        console.log(JSON.stringify(objects));
    };
};