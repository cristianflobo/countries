const { users} = require('../db')
const axios = require('axios')
const ver = require('../db')


const getPaises = async (req,res) => {
  const count = []
    try {
        const countries = await axios.get("https://restcountries.com/v3/all")
        //console.log(countries)
        const con = countries.data.map((item) =>{
            const {ccn3,name:{common}} = item
            let id = item.ccn3
            let name = item.name.common
            return {id,name}
           
        })
        console.log(countries.data[0].ccn3)
        
       res.json(con)
       res.end()
    } catch (error) { 
        console.log(error)
    }       
}


module.exports = {
    getPaises,
    
}