/**
 * NETLIFTER
 *
 * User controller.
 */
import { ServerStatusDB } from '../db/server-status-db.js';

export class ServerStatusController {
  async findAll() {
    const server_status_db = new ServerStatusDB();
    const data = await server_status_db.findAll();
    const server_status_list = [];
    data.forEach((u) => {
      server_status_list.push(u);
    });
    return server_status_list;
  }

  async updateKeepAlive(server_code) {
    const server_status_db = new ServerStatusDB();
    const data = await server_status_db.updateKeepAlive(server_code);
    const server_status_list = [];
    data.forEach((u) => {
      server_status_list.push(u);
    });
    return server_status_list;
  }
}
