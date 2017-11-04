module.exports = function(){
    Object.defineProperty(Creep.prototype, "isFull", {
        get: function () {
            return (_.sum(this.carry) >= this.carryCapacity);
        }
    });
    Object.defineProperty(Creep.prototype, "state",{
        get: function(){
            if(this.memory.state === undefined){
                this.memory.state = '';
                return '';
            }
            else
                return this.memory.state;
        },
        set: function(val){
            this.say(val);
            this.memory.state = val;
        }
    });
};