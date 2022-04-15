import axios from  'axios'
import { useSelector } from 'react-redux'


export const inicio = (e) => async (dispatch) => {

    console.log("HOME")
    try {    
        const respuesta = await axios.get(`http://localhost:3001/countries`)
       // console.log(respuesta.data)
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
export const filtroCont = (countries,value) => async (dispatch) => { 
    console.log("filtroCont",countries.length)
    const filtro = countries.filter((item,i)=> item.continente === value)
    if(filtro){      
        dispatch({
        type:"FILTROCON",
        payload:filtro,
        filtro:value
        })  
    }                         
   
}
