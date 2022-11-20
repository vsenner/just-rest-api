import { DataTypes } from 'sequelize';
import DB from "../index.js";
import User from "./User.js";
import Category from "./Category.js";

const Income = DB.define('Income', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
});

export default Income