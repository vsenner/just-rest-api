import { DataTypes } from 'sequelize';
import DB from "../index.js";

const Category = DB.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  }
});

export default Category