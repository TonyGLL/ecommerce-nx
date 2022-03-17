import * as ProductModel from '../main/main.model';
import * as CategoryModel from '../categories/categories.model';

export default class GlobalModels {
  public setupModels(sequelize: any): any {

    // Initializations
    ProductModel.Product.init(ProductModel.ProductSchema, ProductModel.Product.config(sequelize));
    CategoryModel.Category.init(CategoryModel.CategorySchema, CategoryModel.Category.config(sequelize));

    // Associations
    CategoryModel.Category.associate(sequelize.models);
    ProductModel.Product.associate(sequelize.models);
  }
}
