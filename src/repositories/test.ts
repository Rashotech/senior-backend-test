// // import { AppDataSource } from '../database/data-source';
// // import { User } from '../models/user.model';
// // import { Service } from 'typedi'

// // export const UsersRepository = AppDataSource.getRepository(User).extend({
// //   findByEmail(email: string) {
// //       return this.createQueryBuilder("user")
// //            .findOne({ where: { email } });
// //   },
// // })

// import { AppDataSource } from '../database/data-source';
// import { User } from '../models/user.model';
// import { Service, Container } from 'typedi'
// import { DataSource, Repository } from 'typeorm';

// Container.set(UsersRepository)
// @Service()
// export class UsersRepository extends Repository<User> {
//   constructor(dataSource: DataSource) {
//     super(User, dataSource.createEntityManager());
//   }

//   async findByEmail(email: string): Promise<User | undefined> {
//     return await this.findOne({ where: { email } })
//   }
// }