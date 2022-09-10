const express = require('express');
const router = express.Router();
const env = require('../config/env');
const { generateJSONResponse } = require('../helpers/helpers');

const aRouter = require('./testRouteA');
const bRouter = require('./testRouteB');
const userRouter = require('./userRoute');
const collectionRouter = require('./collectionRoute');

const docsRouter = require('./docs');

const routes = [
  {
    path: '/a',
    route: aRouter,
  },
  {
    path: '/b',
    route: bRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/collection',
    route: collectionRouter,
  }
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRouter,
  }
]

routes.forEach((route) => {
  router.use(route.path, route.route);
});

if (env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

router.get('/', (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - API root"));
});

module.exports = router;
