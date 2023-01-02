const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .then((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.todos = require("./todosModel")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync has been done..");
});
//========== Creating Relationship =============
db.users.hasMany(db.todos, {
  foreignKey: "user_id",
  as: "todo",
});

db.todos.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});
// ======================= exporting everything =================
module.exports = db;
