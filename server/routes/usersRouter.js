const router  = require("express").Router();
const usersController = require("../controllers/usersController.js");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);

module.exports = router;
