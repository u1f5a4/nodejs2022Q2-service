import * as fs from 'fs';
import * as os from 'os';
import 'dotenv/config';

export class FileWriter {
  path: string;
  filename: string;
  maxSizeKB: number;

  constructor(path: string, filename: string) {
    this.filename = filename;
    this.path = path;
    this.maxSizeKB = Number(process.env.LOG_MAX_SIZE_KB);
  }

  async write(message: string) {
    const fullFilePath = this.path + this.filename;
    const symbolNewLine = os.EOL;

    if (!this.directoryExist(this.path)) fs.mkdirSync(this.path);
    if (!this.fileExist(fullFilePath)) fs.writeFileSync(fullFilePath, '');
    if (!this.checkSizeLimit()) fs.rmSync(this.path + this.filename);

    fs.appendFileSync(fullFilePath, message + symbolNewLine);
  }

  private checkSizeLimit() {
    const fullFilePath = this.path + this.filename;
    const stats = fs.statSync(fullFilePath);
    const fileSizeInBytes = stats['size'];
    const fileSizeInKB = fileSizeInBytes / 1000;

    if (fileSizeInKB < this.maxSizeKB) return true;
    else return false;
  }

  private fileExist(path: string) {
    try {
      fs.lstatSync(path).isFile();
      return true;
    } catch (err) {
      return false;
    }
  }

  private directoryExist(path: string) {
    try {
      fs.lstatSync(path).isDirectory();
      return true;
    } catch (err) {
      return false;
    }
  }
}
