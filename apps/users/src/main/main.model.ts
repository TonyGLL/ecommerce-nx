import { Model, DataTypes } from "sequelize";

const USER_TABLE = 'users';
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  last_name: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  email: {
    allowNull: false,
    type: DataTypes.TEXT,
    unique: true
  },
  role: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  avatar: {
    allowNull: true,
    type: DataTypes.TEXT,
    defaultValue: 'null',
  },
  phone: {
    allowNull: false,
    type: DataTypes.TEXT
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

class User extends Model {

  static config(sequelize: any): any {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

export { User, USER_TABLE, UserSchema };
export interface IUser {
  id?: number;
  name: string;
  last_name: string;
  role?: string;
  email: string;
  password: string;
  avatar?: string;
  phone: string;
  status: boolean;
}
