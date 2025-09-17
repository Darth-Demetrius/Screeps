var rolecollector = require('role.collector');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var spawnWorker = {
    /** @param {string} spawner **/
    /** @param {string} role **/
    run: function(spawner, job) {
        console.log('Spawning new ' + job);
        Game.spawns[spawner].spawnCreep(
            [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
            job + Game.time, 
            {memory: {role: 'worker', subrole: job}}
        );
    }
}

module.exports = spawnWorker;
