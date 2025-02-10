// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// });

// const User = require('./user')(sequelize);
// const Company = require('./company')(sequelize);
// const Review = require('./review')(sequelize);


// module.exports = { sequelize, User, Company, Review };


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,  // Optional: Disable logging for cleaner output
});

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Company = require('./company')(sequelize, Sequelize.DataTypes);
const Review = require('./review')(sequelize, Sequelize.DataTypes);

// Initialize associations
const models = { User, Company, Review };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
