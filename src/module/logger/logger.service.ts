import { ConsoleLogger, Injectable } from '@nestjs/common';
import 'dotenv/config';

import { FileWriter } from './filewriter.service';

const LogLevel = ['ERROR', 'WARN', 'LOG', 'DEBUG', 'VERBOSE'];

@Injectable()
export class Logger extends ConsoleLogger {
  private logLevel: string[];

  constructor() {
    super();

    const logLevels = process.env.LOG_LEVEL.split(',');
    this.logLevel = LogLevel.slice(0, Number(logLevels));
  }

  use(req: any, res: any, next: any) {
    // middelware logic
    const url = req.baseUrl;
    const query = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);

    this.send(`LOG [Request] ${url} ${query} ${body}`);

    res.on('finish', () => {
      this.send(`LOG [Response] ${res.statusCode}`);
    });

    next();
  }

  log(message: any, context?: string): void {
    const data = `LOG [${context}] ${message}`;
    this.send(data);
  }

  error(message: any, stack?: string, context?: string) {
    const data = `ERROR [${context}] ${message}`;
    this.send(data);
  }

  verbose(message: any, context?: string): void {
    const data = `VERBOSE [${context}] ${message}`;
    this.send(data);
  }

  debug(message: any, context?: string): void {
    const data = `DEBUG [${context}] ${message}`;
    this.send(data);
  }

  warn(message: any, context?: string): void {
    const data = `WARN [${context}] ${message}`;
    this.send(data);
  }

  uncaughtException(message: string) {
    this.send(message);
  }

  private getDate(): string {
    return new Date().toLocaleString();
  }

  send(message: string) {
    const type = message.split(' ')[0];
    if (!this.logLevel.includes(type)) return;

    if (type === 'ERROR') {
      const data = `${this.getDate()} ${message}`;
      new FileWriter('src/logs/', 'errors.txt').write(data);
    }

    const data = `${this.getDate()} ${message}`;
    new FileWriter('src/logs/', 'log.txt').write(data);
  }
}
