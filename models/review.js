const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

 
  Review.associate = (models) => {
    Review.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
    });

    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Review;
};
