const express = require('express');

const { getAggregate } = require("./aggregates.controller");

const router = express.Router();

router.get('/', getAggregate);

module.exports = router;