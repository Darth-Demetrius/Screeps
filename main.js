var _ = require('lodash');

var roleCollector = require('role.collector');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');
var spawnWorker = require('spawn.worker');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var collectors = _.filter(Game.creeps, (creep) => creep.memory.subrole == 'collector');
    var   builders = _.filter(Game.creeps, (creep) => creep.memory.subrole == 'builder');
    var  upgraders = _.filter(Game.creeps, (creep) => creep.memory.subrole == 'upgrader');

    if(collectors.length < 2) spawnWorker.run('Spawn1', 'collector')
    if(  builders.length < 2) spawnWorker.run('Spawn1', 'builder')
    if( upgraders.length < 0) spawnWorker.run('Spawn1', 'upgrader')

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'worker') roleWorker.run(creep);
    }

    var tower = Game.getObjectById('4c99c09e66fcd5807c5b6de5');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}
