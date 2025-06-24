const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:test@localhost:5432/state_registration_deadlines'
});

module.exports = pool;