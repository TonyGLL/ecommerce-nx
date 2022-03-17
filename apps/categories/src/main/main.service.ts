import { Category, ICategory } from './main.model';
import Sequelize from 'sequelize';

class categoriesServices {
  public Op: any;
  constructor() {
    this.Op = Sequelize.Op;
  }
  public async getCategories(queries: any): Promise<any> {
    let { page, limit, name } = queries;
    const options: any = {
      attributes: {
        exclude: ['status']
      },
      where: {
        status: true
      },
      order: [['id', 'ASC']]
    }
    if (name) options.where.name = { [this.Op.iLike]: `%${name.replace(/ /g, '%')}%` };
    if (limit && page) {
      options.limit = limit;
      options.offset = page < 2 ? 0 : (page * limit) - limit;
    }
    try {
      const categories = await Category.findAll(options);
      return [
        200,
        categories.length > 0 ? {
          categories,
          total: categories.length,
          page: Number.parseInt(page)
        } : {
          categories: [],
          total: 0,
          page: 0
        }
      ];
    } catch (error) {
      return [500, error];
    }
  }

  public async getCategoryById(id: string): Promise<any> {
    try {
      const category: any = await Category.findByPk(id);
      if (category) {
        return [200, { category }];
      } else {
        return [404, { error: 'Category not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async updateCategory(id: string, data: any): Promise<any> {
    try {
      const category: any = await Category.findByPk(id);
      if (category) {
        await category?.update(data);
        return [201, {
          message: 'Category updated successfully!!!'
        }];
      } else {
        return [404, { error: 'Category not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async deleteCategory(id: string): Promise<any> {
    try {
      const category: any = await Category.findByPk(id);
      if (category) {
        category.update({ status: false });
        return [200, {
          message: 'Category deleted successfully!!!'
        }];
      } else {
        return [404, { error: 'Category not found' }];
      }
    } catch (error) {
      return [500, error];
    }
  }

  public async createCategory(category: any): Promise<any> {
    try {
      await Category.create(category);
      return [201, { message: 'Category created successfully!!!' }];
    } catch (error) {
      return [500, error];
    }
  }
}

export default new categoriesServices();
