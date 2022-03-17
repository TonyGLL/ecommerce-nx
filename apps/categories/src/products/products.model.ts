import { Model, DataTypes } from "sequelize";
import { CATEGORY_TABLE } from "../main/main.model";

const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    }
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW
  }
}

class Product extends Model {
  static associate(models: any): void {
    this.belongsTo(models.Category, {
      as: 'category'
    });
  }

  static config(sequelize: any): any {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

export { Product, PRODUCT_TABLE, ProductSchema };
export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
