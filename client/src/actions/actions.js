import axios from  'axios'



export const inicio = (e) => async (dispatch) => {
   
    try {    
        //const respuesta = await axios.get(`http://localhost:3001/countries`)
        const respuesta = await axios.get(`/countries`)
        if (respuesta.data.length > 0) {
            dispatch({
                type:"HOME",
                payload:respuesta.data,
                load:true
            })  
        }                      
    } catch (error){
        console.log(error)
    }    
}
export const filtroCont = (countries,value) => (dispatch) => { 
    if(value != "todos"){
        var filtro = countries.filter((item,i)=> item.continente === value)
    }else{
        filtro = countries
    }
    if(filtro){      
        dispatch({
        type:"FILTROCON",
        payload:filtro,
        filtro:value
        })  
    }                         
   
}
export const searchName = (arrayFor) => (dispatch) => {   
    dispatch({
    type:"FILTROCON",
    payload:arrayFor,
    })  
                             
}
export const nameTourFu = () => async (dispatch) => {  

    //const  respuesta = await axios.get(`http://localhost:3001/nametour`)
    const  respuesta = await axios.get(`/nametour`)
    dispatch({
    type:"NAMETOUR",
    payload:respuesta.data,
    })  
                         
}
export const form = (e) => async (dispatch) => {   
   
    try {    
        //const  respuesta = await axios.post(`http://localhost:3001/tour`,
        const  respuesta = await axios.post(`/tour`,
        {name:e.target[0].value, dificultad:e.target[1].value, duracion:e.target[2].value, countries:e.target[3].value, temporada:e.target[4].value})          
        
    } catch (error){
        console.log(error)
    }
                         
}
export const ordenAccion = (value) => (dispatch) => {    
    //console.log(value)
    dispatch({
        type:"ORDENAMIENTO",
        payload:value,
        })                       
}
export const filtroTour = (value) => (dispatch) => {    

    dispatch({
        type:"FILTROTOUR",
        payload:value,
        })                       
}