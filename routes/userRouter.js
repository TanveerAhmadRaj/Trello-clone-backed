const userController = require("../conrollers/userController.js");
const todoController = require("../conrollers/todosController.js");
const router = require("express").Router();
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUserTodos", userController.getTodos);
// All Todos Controllers.....
router.post("/add", todoController.addTodo);
router.get("/todos", todoController.getTodos);

router.get("/:id", todoController.getTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
