module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    recipient: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Message;
};
