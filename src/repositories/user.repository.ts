import { Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { User } from '../models/user.model';

@Service()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}

