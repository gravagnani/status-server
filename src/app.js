import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import routesV1 from './routes/v1/routes.js';

var app = new Koa();

// MIDDLEWARES
app.use(bodyParser());

// ROUTES
app.use(routesV1.routes()).use(routesV1.allowedMethods());

export default app;
