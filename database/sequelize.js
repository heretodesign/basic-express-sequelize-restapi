const Sequelize = require("sequelize");
const sqlite3 = require("sqlite3");

module.exports = new Sequelize('sqlite:db_bulletin.db');
