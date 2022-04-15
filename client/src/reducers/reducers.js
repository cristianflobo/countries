const initialState ={
    countrie:[],
    filContry:[], 
    load:false ,
    filtro:"todos",
  
}

const HOME = "HOME"
const FILTROCON = "FILTROCON"
export default function reducer(state = initialState , action){
    console.log(state,action.payload)
    switch(action.type){
        case HOME:
            return {
                ...state,
                countrie:action.payload,
                filContry:action.payload,
                load:action.load
            }
        case FILTROCON:
            return{
                ...state,
                filContry:action.payload,
                filtro:action.filtro
            }      

        default: 
            return state
    }

} 

