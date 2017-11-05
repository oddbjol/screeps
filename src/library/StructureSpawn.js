module.exports = function(){



    StructureSpawn.prototype.buildRoadsToSources = function(){
        let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);

        for(let source of sources){
            this.pos.buildRoadTo(source.pos);
        }
    };

    // Gets RoomPosition of certain block in spiral pattern around spawner.
    StructureSpawn.prototype.getBlock = function(num) {
        let originX = this.pos.x - 1;
        let originY = this.pos.y - 1;
        const TILE_SIZE = 3;

        let sum = 0, diameter, ring_number, delta;
        for (ring_number = 1; ring_number < 10; ring_number++) {
            diameter = ring_number * 2;
            let border = 4 * (ring_number * 2);
            if (num < sum + border) {
                delta = num - sum;
                break;
            }

            // 4*i*2 is number of tiles in the tile border of a square with tile radius i
            // sum is the number of tiles in a
            sum += border;
        }

        let delta2 = delta % diameter;
        let side_num = Math.floor(delta / diameter);

        let LEFT = -ring_number;
        let RIGHT = ring_number;
        let TOP = -ring_number;
        let BOTTOM = ring_number;

        let x,y;

        switch (side_num) {
            case 0:
                x = originX + TILE_SIZE * (LEFT + delta2);
                y = originY + TILE_SIZE * TOP;
                break;
            case 1:
                x = originX + TILE_SIZE * RIGHT;
                y = originY + TILE_SIZE * (TOP + delta2);
                break;
            case 2:
                x = originX + TILE_SIZE * (RIGHT - delta2);
                y = originY + TILE_SIZE * BOTTOM;
                break;
            case 3:
                x = originX + TILE_SIZE * LEFT;
                y = originY + TILE_SIZE * (BOTTOM - delta2);
                break;
        }
        return new RoomPosition(x, y, this.room.name);
    };

    StructureSpawn.prototype.buildBlockAt = function(num){
        let pos = this.getBlock(num);

        //      R:road      O: extension
        //
        //      RRRR
        //      ROOR
        //      ROOR
        //      RRRR

        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                if(x == 0 || x == 3 || y == 0 || y == 3) // road
                    this.room.createConstructionSite(pos.x+x, pos.y+y, STRUCTURE_ROAD);
                else
                    this.room.createConstructionSite(pos.x+x, pos.y+y, STRUCTURE_EXTENSION);
            }
        }
    };

    StructureSpawn.prototype.addBlock = function(){
        this.buildBlockAt(this.blocksPlaced++);
    };

    StructureSpawn.prototype.repeatBody = function(body){
        let out = [];

        let cost = 0; body.forEach(e => cost += BODYPART_COST[e]);
        let num = Math.floor(this.room.energyAvailable / cost);

        for(let i = 0; i < Math.max(num,1); i++){
            out = out.concat(body);
        }
        return out;
    };

    Object.defineProperty(StructureSpawn.prototype, "blocksPlaced", {
        get:function(){
            let placed = this.memory.blocksPlaced;
            if(placed === undefined){
                this.memory.blocksPlaced = 0;
                return 0;
            }

            return placed;
        },
        set:function(val){
            this.memory.blocksPlaced = val;
        }
    });
};