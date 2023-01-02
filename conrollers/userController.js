const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;
const Todo = db.todos;
var userWitEmail = {};
//============= Registering User====================
const registerUser = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const already = await User.findOne({ where: { email: data.email } });
  if (already) {
    res.status(201).send("email has already been taken");
  } else {
    const user = await User.create(data);
    res.status(200).send(user);
  }
};

//============= Login the usrs ======================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  userWitEmail = await User.findOne({
    where: { email: email },
  }).catch((err) => {
    console.log(err);
  });
  if (!userWitEmail)
    return res.status(201).send({ message: "Wrong Email or Password" });
  else if (userWitEmail.password !== password)
    return res.status(201).send({ message: "Wrong Email or Password" });
  else {
    const jwtToken = jwt.sign(
      { id: userWitEmail.id, email: userWitEmail.email },
      "the_secrect_key"
    );
    res.send({ userWitEmail, token: jwtToken });
  }
};

// Getting All Todos Based On Specific User.......
const getTodos = async (req, res) => {
  const data = await User.findOne({
    where: { id: userWitEmail.id },
    include: [
      {
        model: Todo,
        as: "todo",
        seperate: true,
      },
    ],
    order: [[Todo, "stateIndex", "ASC"]],
  });

  res.status(200).send(data.todo);
};
module.exports = {
  registerUser,
  loginUser,
  getTodos,
};
