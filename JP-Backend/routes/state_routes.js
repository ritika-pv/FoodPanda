const express = require("express");
const {
  createState,
  getStates,
  getStateByName,
} = require("../controller/state_controller");

const router = express.Router();

router.route("/state/new").post(createState);
router.route("/get-states").get(getStates);
router.route("/state").get(getStateByName);

module.exports = router;
