import { Product, IProduct } from './main.model';
import Sequelize from 'sequelize';

class productsServices {
  public Op: any;
  constructor() {
    this.Op = Sequelize.Op;
  }
  public async getProducts(queries: any): Promise<any> {
    let { page, limit, name, description, min_price, max_price } = queries;
    const options: any = {
      attributes: {
        exclude: ['status']
      },
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    }
    if (min_price && !max_price) {
      options.where.price = {
        [this.Op.gte]: min_price
      }
    } else if (!min_price && max_price) {
      options.where.price = {
        [this.Op.lte]: max_price
      }
    } else if (min_price && max_price) {
      options.where.price = {
        [this.Op.between]: [min_price, max_price]
      }
    }
    if (name) options.where.name = { [this.Op.iLike]: `%${name.replace(/ /g, '%')}%` };
    if (description) options.where.description = { [this.Op.iLike]: `%${description.replace(/ /g, '%')}%` };
    if (limit && page) {
      options.limit = limit;
      options.offset = page < 2 ? 0 : (page * limit) - limit;
    }
    try {
      const products = await Product.findAll(options);
      return [
        200,
        products.length > 0 ? {
          products,
          total: products.length,
          page: Number.parseInt(page)
        } : {
          products: [],
          total: 0,
          page: 0
        }
      ];
    } catch (error) {
      return [500, error];
    }
  }

  public async createProduct(product: any): Promise<any> {
    try {
      await Product.create(product);
      return [201, { message: 'Product created successfully!!!' }];
    } catch (error) {
      return [500, error];
    }
  }
}

export default new productsServices();
