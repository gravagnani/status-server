/**
 * NETLIFTER
 *
 * EntityDB abstract class.
 */
import pkg from 'pg';

const { Pool } = pkg;

export class EntityDB {
  static pool = null;

  constructor() {
    EntityDB.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      ssl: true,
    });
  }

  getPool() {
    return EntityDB.pool;
  }
}
