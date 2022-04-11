const  { Country,tour} = require('../db')
//const { conn } = require('../db');
const axios = require('axios')
let countries = []
let countries2 = []

const getPaises = async (req,res,next) => {
    console.log("1")
    const value = req.query   
    
    if (req.query.name != undefined) {                                         //VALIDACION SI TRAE UN DATO POR QUERY QUE SE HAGA LA BUSQUEDA
        const busca = await Country.findAll({
               where: {
               name: req.query.name
               }
       })
       if (busca[0] == undefined) {
           res.send("Pais no encontrado")
       }else{
           res.json(busca)
       }
       
       res.end();       
   }
    let prueba = await Country.findAll({ attributes: ['id'],limit: 1  })
    let validate = prueba.map(item =>{return id = item.dataValues.id})     //mapeo para obtener id y saber si la tabla tiene country creados o no 
    //console.log("ty",prueba)
    if (value.name == undefined && (typeof validate[0] != "number")) {     //VALIDACION PARA QUE NO SE CRE LOS DATOS DE NUEVO EN LA BASE DE DATOS 
        var removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } 
        try {
            countries = await axios.get("https://restcountries.com/v3/all")
            countries2 =  Promise.all( countries.data.map( async (item) =>{
                //const {ccn3,name:{common}} = item
                const {subregion,area} = item
                if (item.ccn3 === undefined) {
                    var id = 999
                }else{
                    var id = item.ccn3
                }
                let name = (item.name.common)
                let imagen = item.flags[1]
                let continente = removeAccents(item.region)
                if (item.capital) {
                    var capital =removeAccents(item.capital[0])
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
        res.end()
        } catch (error) { 
            console.log(error)
        }finally{
            console.log(countries2)
        }
    }  


    
res.end()
}

const Busqueda = async (req,res)=>{
    console.log("2")
    console.log(countries)
    let prueba = await Country.findAll({ attributes: ['id'],limit: 1  })
    res.json(prueba)
}
const searchId = async (req,res)=>{
    console.log("3")
    const search = await Country.findByPk(req.params.id);
    res.json(search)
    res.end()
}
const searchName = async (req,res)=>{
    console.log("4")
     //console.log(req.query) 
    // res.end()
  }


module.exports = {
    getPaises,
    Busqueda,
    searchId,
    searchName,
}