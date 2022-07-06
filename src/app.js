import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import routes from './routes/routes.js';

var app = new Koa();

// MIDDLEWARES
app.use(bodyParser());

// ROUTES
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
