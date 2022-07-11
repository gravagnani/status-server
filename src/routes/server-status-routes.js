import Router from '@koa/router';

import { statuses } from '../constants/statuses.js';
import { ServerStatusController } from '../controller/server-status-controller.js';

const router = new Router();

router.get("/", async (ctx, next) => {
  const server_status_controller = new ServerStatusController();

  const { expired } = ctx.request.query;

  try {
    const server_status_list =
      expired == "Y"
        ? await server_status_controller.findExpired()
        : await server_status_controller.findAll();
    ctx.status = statuses.OK;
    ctx.body = server_status_list;
  } catch (err) {
    ctx.status = statuses.INTERNAL_SERVER_ERROR;
    ctx.body = "Internal Server Error";
    console.error(err);
  }
});

router.post("/", async (ctx, next) => {
  const server_status_controller = new ServerStatusController();

  const { server_code } = ctx.request.body;

  try {
    const server_status_list = await server_status_controller.updateKeepAlive(
      server_code
    );
    ctx.status = statuses.OK;
    ctx.body = server_status_list;
  } catch (err) {
    ctx.status = statuses.INTERNAL_SERVER_ERROR;
    ctx.body = "Internal Server Error";
    console.error(err);
  }
});

router.post("update-next-mail", async (ctx, next) => {
  const server_status_controller = new ServerStatusController();

  const { server_code } = ctx.request.body;

  try {
    const server_status_list =
      await server_status_controller.updateNextSendMail(server_code);
    ctx.status = statuses.OK;
    ctx.body = server_status_list;
  } catch (err) {
    ctx.status = statuses.INTERNAL_SERVER_ERROR;
    ctx.body = "Internal Server Error";
    console.error(err);
  }
});

export default router;
