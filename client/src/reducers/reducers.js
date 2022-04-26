const initialState ={
    countrie:[],
    filContry:[], 
    load:false ,
    filtro:"todos",
    botones:"none",
    form:[],
    ordenamiento:"A-Z",
    nameTour:[]
    
}

const HOME = "HOME"
const FILTROCON = "FILTROCON"
const SEARCHNAME = "SEARCHNAME"
const BOTONES = "BOTONES"
const FORM = "FORM"
const ORDENAMIENTO = "ORDENAMIENTO"
const NAMETOUR = "NAMETOUR"

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
        case BOTONES:
            return{
                ...state,
                botones:action.payload,
            }
        case FORM:
            return{
                ...state,
                form:action.payload,
            } 
        case ORDENAMIENTO:
            return{
                ...state,
                ordenamiento:action.payload,
            } 
        case NAMETOUR:
            return{
                ...state,
                nameTour:action.payload,
            }           

        default: 
            return state
    }

} 

