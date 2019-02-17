const { Pool } = require('pg');

const config = require('../config/postgres');

const pool = new Pool({
  connectionString: config.default.connectionString,
});

module.exports = pool;
