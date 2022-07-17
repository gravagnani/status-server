import { EntityDB } from "./entity-db.js";

/**
 * NETLIFTER
 *
 * ServerStatusDB entity.
 */
export class ServerStatusDB extends EntityDB {
  async findAll() {
    const query = {
      text: `
        SELECT s.server_code, s.server_desc, s.last_keep_alive
        FROM public.server_status s
        WHERE flag_active = 'Y'
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
      console.error(err);
    } finally {
      this.getPool().end();
    }

    return server_status_ret_list;
  }

  async findExpired() {
    const query = {
      text: `
        SELECT s.server_code, s.server_desc, s.last_keep_alive, s.timeout_send_mail, s.next_send_mail, s.mail_from, s.mail_to
        FROM public.server_status s
        WHERE flag_active = 'Y'
          AND next_send_mail <= CURRENT_TIMESTAMP
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
          , next_send_mail = CURRENT_TIMESTAMP + CAST(timeout_send_mail || ' minutes' AS INTERVAL)
          , last_update = CURRENT_TIMESTAMP
        WHERE server_code = $1
          AND flag_active = 'Y'
        RETURNING server_code, server_desc, last_keep_alive
        `,
      values: [server_code],
    };

    let server_status_ret_list = new Array();

    try {
      const res = await this.getPool().query(query);
      res.rows.forEach((u) => {
        server_status_ret_list.push(u);
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.getPool().end();
    }

    return server_status_ret_list;
  }

  async updateNextSendMail(server_code) {
    const query = {
      text: `
        UPDATE public.server_status
        SET next_send_mail = CURRENT_TIMESTAMP + CAST(period_send_mail || ' minutes' AS INTERVAL)
          , last_update = CURRENT_TIMESTAMP
        WHERE server_code = $1
        RETURNING server_code, server_desc, last_keep_alive, next_send_mail
        `,
      values: [server_code],
    };

    let server_status_ret_list = new Array();

    try {
      const res = await this.getPool().query(query);
      res.rows.forEach((u) => {
        server_status_ret_list.push(u);
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.getPool().end();
    }

    return server_status_ret_list;
  }
}
