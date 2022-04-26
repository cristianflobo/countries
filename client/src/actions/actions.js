import axios from  'axios'
import { useSelector } from 'react-redux'


export const inicio = (e) => async (dispatch) => {
    console.log("HOME")
    try {    
        const respuesta = await axios.get(`http://localhost:3001/countries`)
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
    console.log("filtro",value)
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
    console.log("entra")
    const  respuesta = await axios.get(`http://localhost:3001/nametour`)
    console.log(respuesta.data)
    dispatch({
    type:"NAMETOUR",
    payload:respuesta.data,
    })  
                         
}
export const form = (e) => async (dispatch) => {   
    console.log(e.target[3].value)
    try {    
        const  respuesta = await axios.post(`http://localhost:3001/tour`,
        {name:e.target[0].value, dificultad:e.target[1].value, duracion:e.target[2].value, countries:e.target[3].value, temporada:e.target[4].value})          
        console.log("res",respuesta.data)
    } catch (error){
        console.log(error)
    }
                         
}
export const ordenAccion = (value) => (dispatch) => {    
    console.log(value)
    dispatch({
        type:"ORDENAMIENTO",
        payload:value,
        })
                         
}