import * as chalk from 'chalk';

export class Logger {

  private static logger: Logger;

  info(...message: unknown[]): void {
    console.log(chalk.bgCyan(`✔ ${Date.now()} :`, chalk.underline(message)));
  }

  warn(...message: unknown[]): void {
    console.log(chalk.bgYellow(chalk.black(`⚠ ${Date.now()} :`, chalk.underline(message))));
  }

  error(...message: unknown[]): void {
    console.log(chalk.bgRed(`⛔ ${Date.now()} :`, chalk.underline(message)));
  }

  getInstance(): Logger {
    if (!Logger.logger) {
        Logger.logger = new Logger();
    }
    return Logger.logger;
  }
}
