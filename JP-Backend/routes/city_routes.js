const express = require('express');
const {createCity,getCities} = require('../controller/city_controller');


const router = express.Router();
router.route('/city/new').post(createCity);
router.route('/get-city').get(getCities);

module.exports = router;