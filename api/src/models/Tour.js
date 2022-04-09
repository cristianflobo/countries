const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tour', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true  
    },
    name: {
      type: DataTypes.STRING,
    },
    dificultad:{
      type: DataTypes.STRING,
      validator:{
          min:1,
          max:5
      }
    },
    duracion:{
      type: DataTypes.STRING,
      
    },
    temporada:{
      type: DataTypes.STRING,
    },
  },{
    timestamps: false,
  });
};
