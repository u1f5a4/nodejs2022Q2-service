import { ConsoleLogger, Injectable } from '@nestjs/common';
import 'dotenv/config';
import * as fs from 'fs';
import * as os from 'os';

@Injectable()
export class Logger extends ConsoleLogger {
  private logLevel: string[];

  constructor() {
    super();

    this.logLevel =
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'];
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

  uncaughtException(message) {
    this.send(message);
  }

  private getDate(): string {
    return new Date().toLocaleString();
  }

  send(message: string) {
    const type = message.split(' ')[0].toLowerCase();
    if (!this.logLevel.includes(type)) return;

    if (type === 'error') {
      const data = (this.getDate(), message);
      console.log(data);
      new FileWriter('errors.txt').write(data);
    }

    const data = (this.getDate(), message);
    new FileWriter('test.txt').write(data);
  }
}

class FileWriter {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  async write(message: string) {
    fs.mkdirSync('src/logs');

    this.checkSize();

    fs.appendFileSync('src/logs/' + this.filename, message + os.EOL);
  }

  async checkSize() {
    const stats = fs.statSync('src/logs/' + this.filename);
    const fileSizeInBytes = stats['size'];
    const fileSizeInKB = fileSizeInBytes / 1024;

    if (fileSizeInKB > 100) {
      fs.rmSync('src/logs/' + this.filename);
    }
  }
}
