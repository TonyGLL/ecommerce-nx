import { User } from './main.model';
import { hash } from 'bcryptjs';

class usersServices {
  public async getUsers(queries: any): Promise<any> {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password']
        },
        where: {
          status: true
        }
      });
      users.forEach((user: any) => {
        user.avatar = user.avatar === 'null' ? null : user.avatar;
      });
      return [200, { users }];
    } catch (error) {
      return [500, error];
    }
  }

  public async getUserById(id: string): Promise<any> {
    try {
      const user: any = await User.findByPk(id, {
        attributes: {
          exclude: ['password', 'status']
        }
      });
      if (user) {
        user.avatar = user.avatar === 'null' ? null : user.avatar;
        return [200, { user }];
      } else {
        return [404, { error: 'User not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async createUser(user: any): Promise<any> {
    try {
      const existsEmail = await User.findOne({
        where: {
          email: user.email
        }
      });
      if (existsEmail || (user.role !== 'USER' && user.role !== 'ADMIN')) {
        return [400, [{ error: 'User already exist.' }]];
      } else {
        user.password = await hash(user.password, 10);
        await User.create(user);
        return [201, {
          message: 'User created successfully!!!'
        }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async deleteUser(id: string): Promise<any> {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user?.update({ status: false });
        return [200, {
          message: 'User deleted successfully!!!'
        }];
      } else {
        return [404, { error: 'User not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async updateUser(id: string, data: any): Promise<any> {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user?.update(data);
        return [201, {
          message: 'User updated successfully!!!'
        }];
      } else {
        return [404, { error: 'User not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }
}

export default new usersServices();
