import chalk from "chalk";

export class Logger {
  static info(source: string, message: string) {
    console.log(chalk.blue(`[INFO][${source}]`), message);
  }

  static success(source: string, message: string) {
    console.log(chalk.green(`[SUCCESS][${source}]`), message);
  }

  static warn(source: string, message: string) {
    console.log(chalk.yellow(`[WARN][${source}]`), message);
  }

  static agent(agentName: string, message: string) {
    console.log(chalk.magenta(`[AGENT:${agentName}]`), message);
  }

  static error(source: string, message: string) {
    console.log(chalk.red(`[ERROR][${source}]`), message);
  }
}
