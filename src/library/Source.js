module.exports = function(){
    Object.defineProperty(Source.prototype, "memory", {
        get: function(){
            return Memory.sources[this.id];
        }
    });

    Object.defineProperty(Source.prototype, "spotsInUse", {
        get: function(){
            return this.memory.spotsInUse;
        },
        set: function(val){
            this.memory.spotsInUse = val;
        }
    });

    Object.defineProperty(Source.prototype, "totalSpots", {
        get: function(){
            return this.memory.totalSpots;
        },
        set: function(val){
            this.memory.totalSpots = val;
        }
    });

    Source.prototype.numFreeSpots = function(){
        return this.pos.getSurroundingTiles().filter(spot => !spot.hasNaturalWall()).length;
    };
};
