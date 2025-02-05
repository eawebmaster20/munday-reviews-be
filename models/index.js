const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Company = require('./company')(sequelize);
const Review = require('./review')(sequelize);

// Associations
User.hasMany(Review);
Review.belongsTo(User);
Company.hasMany(Review);
Review.belongsTo(Company);

module.exports = { sequelize, User, Company, Review };
