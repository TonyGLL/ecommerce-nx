import * as UserModel from './users.model';
import * as ProductModel from './products.model';
import * as CategoryModel from './categories.model';

export default class GlobalModels {
  public setupModels(sequelize: any): any {

    // Initializations
    UserModel.User.init(UserModel.UserSchema, UserModel.User.config(sequelize));
    ProductModel.Product.init(ProductModel.ProductSchema, ProductModel.Product.config(sequelize));
    CategoryModel.Category.init(CategoryModel.CategorySchema, CategoryModel.Category.config(sequelize));

    // Associations
    CategoryModel.Category.associate(sequelize.models);
    ProductModel.Product.associate(sequelize.models);

  }
}
