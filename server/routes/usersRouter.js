const router  = require("express").Router();
const auth = require("../middleware/auth.js");
const usersController = require("../controllers/usersController.js");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/createTask", auth, usersController.createTask);
router.get("/getAllTasks", auth, usersController.getAllTasks);
router.get("/getTask", auth, usersController.getTask);
router.patch("/updateTask", auth, usersController.updateTask);
router.delete("/deleteTask", auth, usersController.deleteTask);
router.patch("/completeTask", auth, usersController.completeTask);
router.get("/logout", usersController.logout);

module.exports = router;
