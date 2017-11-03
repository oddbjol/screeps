module.exports = function(){
    Object.defineProperty(Creep.prototype, "isFull", {
        get: function () {
            return (_.sum(this.carry) >= this.carryCapacity);
        }
    });
};