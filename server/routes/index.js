const express = require('express');
const router = express.Router();
const env = require('../config/env');
const { generateJSONResponse } = require('../helpers/helpers');

const userRouter = require('./userRoute');
const collectionRouter = require('./collectionRoute');
const subCollectionRouter = require('./subCollectionRoute');
const categoryRouter = require('./categoryRoute');
const subCategoryRouter = require('./subCategoryRoute');
const itemRouter = require('./itemRoute');

const docsRouter = require('./docs');

const routes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/collection',
    route: collectionRouter,
  },
  {
    path: '/subcollection',
    route: subCollectionRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  },
  {
    path: '/subcategory',
    route: subCategoryRouter,
  },
  {
    path: '/item',
    route: itemRouter,
  },
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
