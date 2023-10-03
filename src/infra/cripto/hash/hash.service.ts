import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds = 10;

  async hash(password: string) {
    const hash = await bcrypt.hash(password, this.saltOrRounds);

    return hash;
  }

  async compare(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
