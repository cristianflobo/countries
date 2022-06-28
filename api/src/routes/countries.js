const  { Country,Tour} = require('../db')
const axios = require('axios')
const { Op } = require("sequelize");
const { json } = require('body-parser');
let countries = []
let create = false

const getPaises = async (req,res,next) => { 
    console.log("1")
    const {name} = req.query   
    
    if (name != undefined) {   //VALIDACION SI TRAE UN DATO POR QUERY QUE SE HAGA LA BUSQUEDA                           
        const busca = await Country.findAll({
               where: { name: { [Op.like]: `%${name}%`}},
               include: Tour,   
       })
       
       if (busca[0] == undefined) {
           res.send("Pais no encontrado")
       }else{
           res.json(busca)
       }
       
      return res.end();       
    }
    //let prueba = await Country.findAll({ attributes: ['id']  })
    let todos = await Country.findAll({
        include: Tour,
    })
    let validate = JSON.stringify(todos).length
    if (validate !== 2 ) {
        res.json(todos)
        res.end()
    }else{                       //VALIDACION PARA QUE NO SE CRE LOS DATOS DE NUEVO EN LA BASE DE DATOS  

        var removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } 
        try {
            countries = await axios.get("https://restcountries.com/v3/all")
             await Promise.all( countries.data.map( async (item) =>{
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
                return await Country.create({
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
           // create = true
           let countrieFind = await Country.findAll({
            include: Tour,
            })
           res.json(countrieFind)
            res.end()
        }
    }   
}

const createTour = async (req,res)=>{
    const {countries,name,dificultad,duracion,temporada} = req.body
    try{
        const createTour= await Tour.create({
            name,
            dificultad,
            duracion,
            temporada,
        });
        const arraCountry = countries.split(" ")
        var  arrayFinal = arraCountry.map(e=> {
            if (e.includes("_")) {
              return e.replace('_',' ')
            } 
            return e    
        })
       console.log(arrayFinal)
           var prueba = arrayFinal.map( async(item) =>{
                const country = await Country.findAll({
                    where: {
                    name: item,
                    },
                });          
                await createTour.setCountries(country);
            })
            res.send(createTour)

    } catch (error) {
          console.log(error)
    }      
   

    res.end()
}
const searchId = async (req,res)=>{
    console.log("3")
    const {id}=req.params
    // var validate = Number.isInteger(Number(id))
    // if(validate){
      //  console.log(validate)
        const search = await Country.findByPk(id);
        res.json(search)
   // }
    res.end()
}
const nametour = async (req,res)=>{
    console.log("4")
    let nametour = await Tour.findAll({ attributes: ['name']  })
    res.json(nametour)
    res.end()
  }


module.exports = {
    getPaises,
    createTour,
    searchId,

    nametour
}





  