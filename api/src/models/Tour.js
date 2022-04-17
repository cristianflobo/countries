const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tour', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
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
     // type: DataTypes.ENUM("Verano", "Otoño", "Invierno ", "Primavera"),
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};


// season: {
//   type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
//   allowNull: false,
// },
