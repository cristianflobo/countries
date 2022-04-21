
const validationForm = (e) =>{
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
       // console.log(value.split(" "))
        
    }
    console.log(value.match(regex)); 
      
}

export default validationForm