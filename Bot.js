var mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { sleep } = require('sleep');
const GoalFollow = goals.GoalFollow

var host = "OzzPanter.aternos.me";
var username = "Bot"

const initBot = () => {
  var bot = mineflayer.createBot({
    host: host,
    username: username,
  });
  
  bot.loadPlugin(pathfinder)
  
  function follow() {
    const playerE = bot.players["EmilGamer08"]
  
    bot.on('chat', function(username, message) {
      if (username === bot.username) return;
  
      if (message === "come") {
        const mcData = require("minecraft-data")(bot.version)
        const movements = new Movements(bot, mcData)
        bot.pathfinder.setMovements(movements)
  
        const goal = new GoalFollow(playerE.entity, 1)
        bot.pathfinder.setGoal(goal, true)
        movements.canDig = false
      }
  
      if (message === "stop") {
        const mcData = require("minecraft-data")(bot.version)
        const movements = new Movements(bot, mcData)
        bot.pathfinder.setMovements(movements)
  
        const goal = new GoalFollow(playerE.entity, 1)
        bot.pathfinder.setGoal(goal, false)
      }
    });
  }
  
  bot.once("spawn", follow)
  
  bot.on('chat', function(username, message) {
    if (message === "quit") {
      bot.quit();
    }
  });
  
  bot.on("end", () => {
    console.log("Disconnected");
  
    setTimeout(initBot, 10000)
  });
  
  bot.on("spawn", async () => {
    console.log("Spawned in");
  });

  bot.on("kicked", console.log)
  bot.on("error", console.log)
}
initBot()