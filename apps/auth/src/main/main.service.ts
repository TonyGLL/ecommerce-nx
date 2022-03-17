import { User, IUser } from "./main.model";
import JWT from '../helpers/jwt';
import { compare } from 'bcryptjs';
import Token from '../helpers/token';
import { MailHelper } from '../helpers/transporter';
import ENV from '../config/env';
import { hash } from 'bcryptjs';

class authServices {
  public async signin(email: string, password: string): Promise<any> {
    try {
      const existUser: IUser = await this.existUser(email);
      if (!existUser) {
        return [400, { error: 'Invalid credentials' }];
      }
      const comparePass: boolean = existUser ? await compare(password, existUser.password) : false;
      if (!comparePass) {
        return [400, { error: 'Invalid credentials' }];
      }
      const sign = await this.signJWT(existUser);
      let user: any = existUser;
      delete user.password;
      delete user.status;
      const token = {
        jwt: sign
      }
      return [201, { user, token }];
    } catch (error) {
      return [500, { error }];
    }
  }

  public async signJWT(userData: IUser): Promise<string> {
    let encodedData: any = {
      id: userData.id,
      email: userData.email,
      avatar: userData.avatar,
      phone: userData.phone,
      name: userData.name,
      last_name: userData.last_name,
      role: userData.role
    };
    const token = JWT.signJWT(encodedData);
    return token;
  }

  public async existUser(email: string): Promise<any> {
    try {
      const existsEmail = await User.findOne({
        where: {
          email,
          status: true
        }
      });
      if (!existsEmail) {
        return false;
      }
      return existsEmail.get();
    } catch (error) {
      return false;
    }
  }

  public async forgotPassword(email: string): Promise<any> {
    try {
      const existUser: any = await this.existUser(email);
      if (!existUser) {
        return [404, { error: 'The email does not exist or is not registered.' }];
      }
      let token = await Token.generate();
      const send = new MailHelper(
        email,
        'Recupera tu contraseña',
        `Click here to set a new password: ${ENV.URL}/auth/token?token=${token}&email=${email}`,
        ENV.EMAIL_USER,
        'reset-password',
        {
          "URL_FB": ENV.URL_FB,
          "URL_INSTAGRAM": ENV.URL_INSTAGRAM,
          "URL_TWITTER": ENV.URL_TWITTER,
          "URL_WHATSAPP": ENV.URL_WHATSAPP,
          "SITEURL": `${ENV.URL}/auth/token?token=${token}&email=${email}`,
        }
      );
      const mail_status = await send.sendMailWithTemplate();
      return [201, {
        message: 'Reset password mail successfully sent.',
        mail_accepted: mail_status?.accepted?.length > 0 ? true : false
      }];
    }
    catch (error) {
      return [500, error];
    }
  }

  public async resetPassword(new_password: string, email: string): Promise<any> {
    try {
      const exists: IUser = await this.existUser(email);
      if (!exists) {
        return [404, { error: 'User not exist.' }];
      }
      const hashNewPassword = await hash(new_password, 10);
      const { id } = exists;
      const user = await User.findByPk(id);
      if (user) {
        await user?.update({ password: hashNewPassword });
        return [201, {
          message: 'Password updated.'
        }];
      } else {
        return [404, { error: 'User not found' }];
      }
    } catch (error) {
      return [400, error];
    }
  }
}

export default new authServices();
