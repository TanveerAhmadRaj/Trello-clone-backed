module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    //============ defining our users tbale==================
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
