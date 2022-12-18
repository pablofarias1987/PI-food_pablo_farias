const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {  // Step by step
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
    { timestamps: false } // "timestamps: false" just to avoid having the "createdAt" and "updatedAt" columns created
  );
};