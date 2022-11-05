import { InternalServerErrorException, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

class DatabaseHelper {
  private readonly logger = new Logger(DatabaseHelper.name);
  private dbUri = '';

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.getDbUri());
      this.logger.log('MongoDB connected.');
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  private getDbUri() {
    if (this.dbUri) {
      return this.dbUri;
    }

    const { DB_URI } = process.env;

    if (!DB_URI) {
      throw new InternalServerErrorException('Provide correct DB_URI');
    }

    this.dbUri = DB_URI;

    return this.dbUri;
  }
}

export const databaseHelper = new DatabaseHelper();
