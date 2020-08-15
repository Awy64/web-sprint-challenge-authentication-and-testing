const knex = require('knex');

const knexConfig = require('../knexfile.js');

const DbEnv = process.env.DB_ENV || "development"

module.exports = knex(knexConfig[DbEnv]);
