/**
 * NETLIFTER
 *
 * ServerStatusDB entity.
 */
import { EntityDB } from '../entity-db.js';

export class ServerStatusDB extends EntityDB {
  async findAll() {
    const query = {
      text: `
        SELECT s.codice, s.descrizione
        FROM public.server_status s
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
}
