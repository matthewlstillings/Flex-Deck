const userReducer = (state, action) => {
    switch (action){
        case 'ADD_WORKOUT': 
        return {
            ...state,
            history: action.workout
        }
        case 'SET_USER': 
            return {
                ...state
            }
        default :
            return state
    }
   
}

export default userReducer;