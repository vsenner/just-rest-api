import { DataTypes } from 'sequelize';
import DB from "../index.js";
import User from "./User.js";

const Wallet = DB.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.INTEGER,
    defaultValue: 10000
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
});

export default Wallet