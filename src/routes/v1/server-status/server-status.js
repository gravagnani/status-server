import Router from '@koa/router';

import { statuses } from '../../../constants/statuses.js';
import { ServerStatusController } from '../../../controller/server-status/server-status-controller.js';

const router = new Router();

router.get("/", async (ctx, next) => {
  const server_status_controller = new ServerStatusController();

  try {
    const server_status_list = await server_status_controller.findAll();
    ctx.status = statuses.OK;
    ctx.body = server_status_list;
  } catch (err) {
    ctx.status = statuses.INTERNAL_SERVER_ERROR;
    ctx.body = "Internal Server Error";
    console.error(err);
  }
});

export default router;
