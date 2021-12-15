import Express from 'express';


import cors from 'cors';

import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import oas from './swagger';



const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);

    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb'}));

    app.use(Express.static(`${root}/public`));


    app.use(cors());

  }

  router(routes) {

    this.routes = routes;
    return this;

  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

    oas(app, this.routes)
      .then(() => {

        http.createServer(app).listen(port, welcome(port));

      })
      .catch((e) => {
        l.error(e);
        exit(1);
      });

    return app;
  }
}
