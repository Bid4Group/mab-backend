import MySqlRepository from '../databases/mysql/MySqlRepository'
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';
import { Operator } from '../databases/engine/filter/Operator';

import User from '../models/User';

class UsersService {
  private mysql: MySqlRepository;

  constructor() {
      this.mysql = new MySqlRepository();
  }
  
  addUser(user: User): Promise<void> {
    return null;
  }

  private sendEmail(user) {
    
  }

  getUsersById(ids: number[]): Promise<User[]> {
    let filter = [];
    for (let i = 0; i < ids.length - 1; i++) {
        filter.push(`ID = ${ids[i]} OR `);
    }
    filter.push(`ID = ${ids[ids.length - 1]}`);

    return this.mysql.find(new User()._type, filter.join("")).then(rowset => {
        let users: User[] = [];
        for (let i = 0; i < rowset.length; i++) {
            let user = new User(rowset[i]);
            users.push(user);
        }
        return users;
    });
  }

}

export default new UsersService();