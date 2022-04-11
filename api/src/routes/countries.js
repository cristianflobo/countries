const  { Country,tour} = require('../db')
//const { conn } = require('../db');
const axios = require('axios')
let countries = []
let countries2 = []

const getPaises = async (req,res,next) => {
   console.log("1")
    console.log("para", req.query) 
    if (req.query) {
       const busca = await Country.findAll({
            where: {
              name: req.query.name
            }
       })
        console.log("query",busca)
        res.end();
        
    }

    if (req.query===[]) {
        var removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } 
     
    try {
         countries = await axios.get("https://restcountries.com/v3/name/colombia")
         
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
    
}

const Busqueda = async (req,res)=>{
    console.log("2")
    console.log(countries)
    let prueba = await Country.findAll({ attributes: ['id'],limit: 1  })
    res.json(prueba)
}
const searchId = async (req,res)=>{
    console.log("3")

   console.log(req.params) 
   const search = await Country.findByPk(170);
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