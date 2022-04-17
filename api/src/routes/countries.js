const  { Country,Tour} = require('../db')
//const { conn } = require('../db');
const axios = require('axios')
const { Op } = require("sequelize");
let countries = []
let countries2 = []
let create = false
const getPaises = async (req,res,next) => { 
    console.log("1")
    const {name} = req.query   
    
    if (name != undefined) {   //VALIDACION SI TRAE UN DATO POR QUERY QUE SE HAGA LA BUSQUEDA  
                                 
        const busca = await Country.findAll({
               where: { name: { [Op.like]: `%${name}%`}},
               include: Tour,   
       })
       console.log("name",name,busca)   
       if (busca[0] == undefined) {
           res.send("Pais no encontrado")
       }else{
           res.json(busca)
       }
       
      return res.end();       
    }
    let prueba = await Country.findAll({ attributes: ['id'],limit: 1  })
    let validate = prueba.map(item =>{return id = item.dataValues.id})     //mapeo para obtener id y saber si la tabla tiene country creados o no 
    //console.log("ty",prueba)
    if (create) {
        countries2 = await Country.findAll();
        res.json(countries2)
        res.end()
    }else{                       //VALIDACION PARA QUE NO SE CRE LOS DATOS DE NUEVO EN LA BASE DE DATOS  
        create = true
            var removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } 
        try {
            countries = await axios.get("https://restcountries.com/v3/all")
            countries2 = await Promise.all( countries.data.map( async (item) =>{
                //const {ccn3,name:{common}} = item
                const {subregion,area} = item
                    var id = item.cca3
                let name = item.name.common.toLowerCase()
                let imagen = item.flags[1]
                let continente = removeAccents(item.region)
                if (item.capital) {
                    var capital = removeAccents(item.capital[0])
                } else {
                    capital = "no capital"
                }
                let poblacion = item.population
                let newCountry = await Country.create({
                    id,
                    name,
                    imagen,
                    continente,
                    capital,
                    subregion,
                    area,
                    poblacion
                })           
            }))    
        } catch (error) { 
            console.log(error)
        }finally{
            create = true
            res.end()
        }
    }   
}

const tour = async (req,res)=>{
    const {countries,name,dificultad,duracion,temporada} = req.body
    try{
        const createTour= await Tour.create({
            name,
            dificultad,
            duracion,
            temporada,
        });
        const country = await Country.findAll({
            where: {
            name: countries,
            },
        });          
        await createTour.setCountries(country);
            return res.json(createTour);
    } catch (error) {
          console.log(error)
    }      
   

    res.end()
}
const searchId = async (req,res)=>{
    console.log("3")
    const {id}=req.params
    var validate = Number.isInteger(Number(id))
    if(validate){
        console.log(validate)
        const search = await Country.findByPk(id);
        res.json(search)
    }
    res.end()
}
const searchName = async (req,res)=>{
    console.log("4")
     //console.log(req.query) 
    // res.end()
  }


module.exports = {
    getPaises,
    tour,
    searchId,
    searchName,
}


// let data = await Country.findAll({
//     where: { name: { [Op.like]: `%${name}%` } },
//     include: Activity,
//   });


// exports.create = async (req, res) => {
//     try {
//       const { countries, name, difficulty, duration, season } = req.body;
//       const createdactivity = await Activity.create({
//         name,
//         difficulty,
//         duration,
//         season,
//       });
//       const countriesfounded = await Country.findAll({
//         where: {
//           name: countries,
//         },
//       });
//       await createdactivity.setCountries(countriesfounded);
//       return res.json(createdactivity);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   };
  