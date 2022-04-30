
const validationForm = (e,nameMach) =>{
    const {value}=e.target
    const {name} = e.target
    if (name==="name") {
        var regex = /(\d+)/g;
        if (value.match(regex)!= null) {
        alert ("solo debe contener numeros")
        e.target.value = value.substring(0, value.length - 1)
    }
    }
    if (name==="dificultad") {
        if (value>5) {
            e.target.value = 5
        }
        if (value<0) {
            e.target.value = 0
        }  
    }
    if (name==="textarea") {
        const arrayCountry = value.split(" ")
        //console.log(arrayCountry)
        const arrayCountryMap = arrayCountry.map((item)=> item.replace("_"," "))
        //console.log(arrayCountryMap)
        const ensa = arrayCountryMap.map(itemap=>{
           return nameMach.includes(itemap)
        })      
        return ensa
    }
    //console.log(value.match(regex)); 
      return ["ok"]
}

export default validationForm