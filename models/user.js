const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.beforeUpdate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 12);
  });

  User.beforeBulkCreate(async (users) => {
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews', 
    });
  };

  return User;
};
