module.exports = function(){
    Object.defineProperty(StructureController.prototype, "maxExtensions", {
        get: function(){
            switch(this.level){
                case 0:
                case 1: return 0;
                case 2: return 5;
                default: return (this.level - 2) * 10;
            }
        }
    });
}
;