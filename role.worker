var roleBuilder = require('role.builder');
var roleCollector = require('role.collector');
var roleUpgrader = require('role.upgrader');

var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.store[RESOURCE_ENERGY]) creep.memory.currentJob = 'harvesting';
        else if(!creep.store.getFreeCapacity() && creep.memory.currentJob == 'harvesting') {
            creep.memory.currentJob = creep.memory.subrole;
        }
        
        if(creep.memory.currentJob == 'harvesting') {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say(sources[0][RESOURCE_ENERGY]);
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if(creep.memory.currentJob == 'collector') roleCollector.run(creep);
        else if(creep.memory.currentJob == 'builder') roleBuilder.run(creep);
        else if(creep.memory.currentJob == 'upgrader') roleUpgrader.run(creep);
        else creep.memory.currentJob = 'harvesting';
	}
};

module.exports = roleWorker;
