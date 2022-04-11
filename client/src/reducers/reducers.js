const initialState ={
    countrie:[],
    
    
}

const HOME = "HOME"
export default function reducer(state = initialState , action){
    switch(action.type){
        case HOME:
            return {
                ...state,
                countrie: action.payload
            }

        default: 
            return state
    }

} 