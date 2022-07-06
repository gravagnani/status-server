/**
 * NETLIFTER
 *
 * ServerStatusDB entity.
 */
import { EntityDB } from './entity-db.js';

export class ServerStatusDB extends EntityDB {
  async findAll() {
    const query = {
      text: `
        SELECT s.server_code, s.server_desc, s.last_keep_alive
        FROM public.server_status s
        ORDER BY 1 ASC
        `,
    };

    let server_status_ret_list = new Array();

    try {
      const res = await this.getPool().query(query);
      res.rows.forEach((u) => {
        server_status_ret_list.push(u);
      });
    } catch (err) {
      // TODO: error log
      console.error(err);
    } finally {
      this.getPool().end();
    }

    return server_status_ret_list;
  }

  async updateKeepAlive(server_code) {
    const query = {
      text: `
        UPDATE public.server_status
        SET last_keep_alive = CURRENT_TIMESTAMP 
          , next_send_mail = CURRENT_TIMESTAMP + CAST(period_send_mail || ' minutes' AS INTERVAL)
        WHERE server_code = $1
        RETURNING *
        `,
        values: [server_code]
    };

    let server_status_ret_list = new Array();

    try {
      const res = await this.getPool().query(query);
      res.rows.forEach((u) => {
        server_status_ret_list.push(u);
      });
    } catch (err) {
      // TODO: error log
      console.error(err);
    } finally {
      this.getPool().end();
    }

    return server_status_ret_list;
  }
}
