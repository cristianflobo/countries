
const validationForm = (e) =>{
    console.log(e)
    var inputName =e.target.value;
    var regex = /(\d+)/g;
    if (inputName.match(regex)!= null) {
        alert ("solo debe contener numeros")
        e.target.value = inputName.substring(0, inputName.length - 1)
    }
    console.log(inputName.match(regex)); 
      
}

export default validationForm