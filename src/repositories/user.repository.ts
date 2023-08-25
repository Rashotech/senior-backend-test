import { AppDataSource } from '../database/data-source';
import { User } from '../models/user.model';

export const UsersRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
      return this.findOne({ where: { email } });
  },
})