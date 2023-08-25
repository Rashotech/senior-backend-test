import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UsersRepository
  ) { }

  public async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public find(): Promise<User[]> {
    return this.userRepository.find({});
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneByOrFail({ id });
  }
}