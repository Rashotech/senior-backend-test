import { Service } from 'typedi';
import { User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { ILogin, IRegister } from '../interfaces/user.interface';
import { BadRequestError } from '../utils/ApiError';
import TokenService from './token.service';

@Service()
export class UserService {
  constructor(
  ) { }

  public async find(): Promise<User[]> {
    return await UsersRepository.find({ select: { password : false } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await UsersRepository.findOneOrFail({ where: { id: Number(id) }});
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await UsersRepository.createQueryBuilder("user")
    .where("user.email = :email", { email })
    .addSelect("user.password")
    .getOne()
  }

  public async register(data: IRegister): Promise<User> {
    const user = await this.findByEmail(data.email);
    if (user) throw new BadRequestError('User already exists');
    data.password = await this.hashPassword(data.password);
    const newUser = await UsersRepository.save(data);
    delete data.password;
    return newUser;
  }

  public async login(data: ILogin) {
    const user = await this.findByEmail(data.email);
    if (!user) throw new BadRequestError('User does not exists');

    const isPasswordCorrect = await this.comparePassword(user, data.password)
    if(!isPasswordCorrect)  throw new BadRequestError('Incorrect credentials');

    delete user.password;
    const token = TokenService.generateToken(user.id.toString());
    return { user, token };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  private async comparePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}