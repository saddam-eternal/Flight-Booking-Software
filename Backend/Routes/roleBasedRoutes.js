const express = require("express");
const router = express.Router();
const { authJwt } = require("../Middleware/indexMiddleware");
const controller = require("../Controllers/roleBasedController");


router.get("/all", controller.allAccess);

router.get("/user", [authJwt.verifyToken],controller.userBoard);

router.get("/mod",[authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard);

router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

module.exports = router
