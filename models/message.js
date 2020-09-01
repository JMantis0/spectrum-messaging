module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      as: "sender",
      foreignKey: {
        allowNull: false,
      },
    });
    Message.belongsTo(models.User, {
      as: "recipient",
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Message;
};
