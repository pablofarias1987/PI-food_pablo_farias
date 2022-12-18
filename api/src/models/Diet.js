const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos la funcion que define el modelo
// Luego le injectamos la conexion a secuelize.

module.exports = (sequelize) => {
    //defino el modelo
    sequelize.define('diet', {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{ timestamps: false } // "timestamps: false" just to avoid having the "createdAt" and "updatedAt" columns created

    );
 };
        
    