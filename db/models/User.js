import { DataTypes } from 'sequelize';
import DB from "../index.js";

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
});

export default User