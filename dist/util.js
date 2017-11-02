Object.defineProperty(Creep.prototype, "isFull", {
    get: function(){
        "use strict";
        return (_.sum(this.carry) >= this.carryCapacity);
    }
});