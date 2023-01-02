module.exports = (sequelize, DataTypes) => {
  //======= creating TODOS table=============

  const Todo = sequelize.define("todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    stateIndex: {
      type: DataTypes.STRING,
    },
  });

  return Todo;
};
