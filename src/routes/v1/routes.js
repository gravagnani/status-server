import Router from '@koa/router';

import serverStatus from './server-status/server-status.js';

const router = new Router({
  prefix: "/",
});

// SERVER_STATUS
router.use("/", serverStatus.routes()).use(serverStatus.allowedMethods());

export default router;
