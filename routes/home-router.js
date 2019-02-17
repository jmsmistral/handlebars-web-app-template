const express = require('express');

const homeController = require('../controllers/homeController');

const router = express.Router();

// home page
router.route('/')
  .get(homeController.getIndex);

// home API
router.route('/sample_endpoint')
  .get(homeController.getSampleEndpoint);


module.exports = router;
