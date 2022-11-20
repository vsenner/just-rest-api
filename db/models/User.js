import { DataTypes } from 'sequelize';
import DB from "../index.js";

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  }
});

export default User