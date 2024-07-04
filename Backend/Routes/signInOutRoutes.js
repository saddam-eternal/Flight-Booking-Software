const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../Middleware/indexMiddleware");
const controller = require("../Controllers/userLogInOutController");
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { userSchemaSignUp, userSchemaSignIn } = require('../JoiValidation/validationSchemas');

router.post("/signup", commonFunctionValidation(userSchemaSignUp),
	[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

router.post("/signin", commonFunctionValidation(userSchemaSignIn), controller.signin);

router.post("/signout", controller.signout);

module.exports = router
 

