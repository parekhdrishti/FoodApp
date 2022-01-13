import { combineReducers } from "redux"
import { CLEAR_USER_DATA, TOGGLE_RATE, ADD_USER_DATA, SIGNUP_BOOL, SIGNUP_ERROR, LOGIN_ERROR, LOGIN_BOOL, TOKEN_DETAIL, API_BOOL, RATE_ID } from "./action"

const merge = (prev,next) => Object.assign({} , prev,next)

const userReducer = (state = {} , action) => {
    switch(action.type){
        case CLEAR_USER_DATA:   
            return (action.payload)
        case ADD_USER_DATA:
            return merge(state , {user_data: action.payload})
        case SIGNUP_BOOL:
            s = merge(state["signup"], {bool: action.payload})
            return merge(state, {"signup": s})
        case SIGNUP_ERROR:
            s = merge(state["signup"], {error: action.payload})
            return merge(state, {"signup": s})
        case LOGIN_ERROR:
            s = merge(state["login"], {error: action.payload})
            return merge(state, {"login": s})
        case LOGIN_BOOL:
            s = merge(state["login"], {bool: action.payload})
            return merge(state, {"login": s})
        case TOKEN_DETAIL:
            return merge(state, {"token": action.payload})
        default:
            return state
    }
}

const apiReducer = (state = false, action) => {
    switch(action.type){
        case API_BOOL:
            return (action.payload)
        default:
            return state
    }
}

const rateReducer = (state = {toggle_bool: false}, action) => {
    switch(action.type){
        case TOGGLE_RATE:
            return merge(state, {toggle_bool: action.payload})
        case RATE_ID:
            return merge(state, {recipe_id: action.payload})
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    rate: rateReducer,
    api: apiReducer
})

export default reducer