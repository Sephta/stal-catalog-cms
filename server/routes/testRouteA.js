const express = require('express');
const router = express.Router();
const { generateJSONResponse } = require('../helpers/helpers');


router.get('/', (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - A"));
});

module.exports = router;