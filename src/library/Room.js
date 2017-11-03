module.exports = function(){
    Room.prototype.findFreeSource = function(){
        let sources = this.find(FIND_SOURCES_ACTIVE);

        for(let source of sources){
            if(source.spotsInUse < source.totalSpots)
                return source;
        }

        return null;
    };
};


