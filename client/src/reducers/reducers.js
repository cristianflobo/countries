const initialState ={
    countrie:[], 
    load:false ,
    page: 1, 
  
}

const HOME = "HOME"
const PAGE = "PAGE"
export default function reducer(state = initialState , action){
    switch(action.type){
        case HOME:
            return {
                ...state,
                countrie: action.payload,
                load:action.load
            }
        case PAGE:
            return{
                ...state,
                page:action.page    
            }
            

        default: 
            return state
    }

} 

