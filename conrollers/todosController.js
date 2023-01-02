const db = require("../models");
const Todo = db.todos;

//=========== methods ================
//No.1 (Adding New Todo)
const addTodo = async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    state: req.body.todoState,
    stateIndex: req.body.index,
    user_id: req.body.user_id,
  };
  const todo = await Todo.create(data);
  res.status(200).send(todo);
};

// No. 2 (Fetching All Todos)....
const getTodos = async (req, res) => {
  const allTodos = await Todo.findAll({
    order: [["stateIndex", "ASC"]],
  });
  res.send(allTodos);
};

// No. 3 (Fetching Specific Todo Based on ID:).....
const getTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ where: { id: id } });
  res.status(200).send(todo);
};
// No. 4 (Updating Records basedon ID:)......
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const data = {
    title: req.body.title,
    description: req.body.description,
    state: req.body.todoState,
    stateIndex: req.body.index,
    user_id: req.body.user_id,
  };
  const todo = await Todo.update(data, { where: { id: id } });
  console.log(todo);
  res.status(200).send(todo);
};

//No. 5 (Deleting Specific Todo Based on ID:)......

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  await Todo.destroy({ where: { id: id } });
  res.status(200).send("Data Deleted");
};

// Exporting All functions....

module.exports = {
  addTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
