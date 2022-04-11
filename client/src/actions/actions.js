import axios from  'axios'

export const inicio = (e) => async (dispatch) => {
    console.log("HOME")
    try {    
        const respuesta = await axios.get(`http://localhost:3001/home`)
        if (respuesta.data) {
            dispatch({
                type:"LOGIN",
                payload:respuesta.data,
            })  
        }                      
    } catch (error){
        console.log(error)
    }    
}
