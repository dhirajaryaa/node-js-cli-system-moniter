import chalk from "chalk";
import os from "node:os";

function monitor() {
  const oldCpus = os.cpus();

  setTimeout(() => {
    const newCpus = os.cpus();

    const cpuUsage = newCpus.map((cpu, i) => {
      return {
        core: i + 1,
        usage: calculateCpus(oldCpus[i], newCpus[i]) + "%",
      };
    });

    const memoryUsage = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);

    // log usage and clear
    console.clear(); 
    console.log(chalk.bgMagenta("==============System Stats=============="));
    // cpu
    console.table(cpuUsage);
    // memory
    console.log(chalk.bgYellow("Memory Used:"),
      memoryUsage > 1.30 ? chalk.redBright(`${memoryUsage.toFixed(2)}GB / ${(
        os.totalmem() /
        (1024 * 1024 * 1024)
      ).toFixed(2)}GB`):chalk.greenBright(`${memoryUsage.toFixed(2)}GB / ${(
        os.totalmem() /
        (1024 * 1024 * 1024)
      ).toFixed(2)}GB`)
    );
    // uptime
    console.log(chalk.bgCyanBright(`\nSystem uptime: ${(os.uptime() / (60)).toFixed()} minutes`));
    
  }, 1000);
}

//! calculate cpu
function calculateCpus(oldCpus, newCpus) {
  const oldTotal = Object.values(oldCpus.times).reduce((a, b) => a + b);
  const newTotal = Object.values(newCpus.times).reduce((a, b) => a + b);

  const idle = newCpus.times.idle - oldCpus.times.idle;

  const total = newTotal - oldTotal;

  const used = total - idle;

  return ((100 * used) / total).toFixed(1);
}

//! run in loop every 1000ms = 1s
setInterval(monitor, 1000);
