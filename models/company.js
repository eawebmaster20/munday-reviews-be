const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
    },
    website: {
      type: DataTypes.TEXT,
    },
    logoUrl: {
      type: DataTypes.TEXT,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  
  Company.associate = (models) => {
    Company.hasMany(models.Review, {
      foreignKey: 'companyId',
      as: 'reviews',
    });
  };
  
  Company.beforeUpdate(async (company, options) => {
    if (company.changed('password')) {
      company.password = await bcrypt.hash(company.password, 12);
    }
  });
  Company.beforeBulkCreate(async (companies) => {
    for (const company of companies) {
      company.password = await bcrypt.hash(company.password, 12);
    }
  });

  Company.beforeCreate(async (company) => {
    company.password = await bcrypt.hash(company.password, 12);
  });




  return Company;
};
