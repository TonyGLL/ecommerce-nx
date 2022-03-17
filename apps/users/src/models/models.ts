import * as UserModel from '../main/main.model';

export default class GlobalModels {
  public setupModels(sequelize: any): any {

    // Initializations
    UserModel.User.init(UserModel.UserSchema, UserModel.User.config(sequelize));
  }
}
