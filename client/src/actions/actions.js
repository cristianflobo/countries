import axios from  'axios'

export const inicio = (e) => async (dispatch) => {
    try {    
        const respuesta = await axios.post(`http://localhost:3001/`,{usuario1:e.target[0].value,clave:e.target[1].value})
        if (respuesta.data) {
            const local = localStorage.setItem('navegacion', 'true');
            dispatch({
                type:"LOGIN",
                payload:respuesta.data,
                log:local
            })  
        }                      
    } catch (error){
        console.log(error)
    }    
}
