const initialState ={
    countrie:[],
    filContry:[], 
    load:false ,
    filtro:"todos",
  
}

const HOME = "HOME"
const FILTROCON = "FILTROCON"
const SEARCHNAME = "SEARCHNAME"
export default function reducer(state = initialState , action){
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
        case SEARCHNAME:
        return{
            ...state,
            filContry:action.payload,
        }        

        default: 
            return state
    }

} 

