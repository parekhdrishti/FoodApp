import { combineReducers } from "redux"
import { CLEAR_USER_DATA } from "./action"

const merge = (prev,next) => Object.assign({} , prev,next)

const userReducer = (state = {} , action) => {
    switch(action.type){
        case CLEAR_USER_DATA:   
            return (action.payload)
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer
})

export default reducer