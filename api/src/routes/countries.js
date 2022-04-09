const { users} = require('../db')
const axios = require('axios')
const ver = require('../db')


const getPaises = async (req,res) => {
  
    try {
        const countries = await axios.get("https://restcountries.com/v3/name/colombia")
        console.log(countries.data)
        res.end()
       // res.json(countries)
    } catch (error) {
        console.log(error)
    }       
}


module.exports = {
    getPaises,
    
}