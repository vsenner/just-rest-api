import {Sequelize} from "sequelize";

const DB = new Sequelize('sqlite::memory:');

export default DB;