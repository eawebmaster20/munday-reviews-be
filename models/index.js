

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(process.env.DB_URL,{
  dialect: 'mysql',
  logging: true, 
});

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Company = require('./company')(sequelize, Sequelize.DataTypes);
const Review = require('./review')(sequelize, Sequelize.DataTypes);

const models = { User, Company, Review };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
