//imports
import { delete_user_api, get_recepes_api, login_api, signup_api, update_user_api } from "../api/api"
import Toast from 'react-native-toast-message';

//actions
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const ADD_USER_DATA = 'ADD_USER_DATA'
export const SIGNUP_BOOL = 'SIGNUP_BOOL'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const TOGGLE_RATE = 'TOGGLE_RATE'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_BOOL = 'LOGIN_BOOL'
export const TOKEN_DETAIL = 'TOKEN_DETAIL'
export const API_BOOL = 'API_BOOL'
export const RATE_ID = 'RATE_ID'


export const rate_id = update => ({
    type: RATE_ID,
    payload: update
})

export const api_bool = update => ({
    type: API_BOOL,
    payload: update
})

export const add_token = update => ({
    type: TOKEN_DETAIL,
    payload: update
})

export const add_login_error = update => ({
    type: LOGIN_ERROR,
    payload: update 
})

export const login_bool = update => ({
    type: LOGIN_BOOL,
    payload: update 
})

export const add_signup_error = update => ({
    type: SIGNUP_ERROR,
    payload: update
})

export const add_user_data = update => ({
    type: ADD_USER_DATA,
    payload: update
})

export const signup_bool = update => ({
    type: SIGNUP_BOOL,
    payload: update
})

export const toggle_rate = update => ({
    type: TOGGLE_RATE,
    payload: update
})

export const clear_user_data = update => ({
    type : CLEAR_USER_DATA,
    payload : update
})



//async actions 


export const update_user_redux_api_call = (token, obj) => async dispatch => {
    try{
        let response = await update_user_api(token, obj)
        let status = response.status 
        console.log(status)
        if(status === 200){
            let text = JSON.parse(await response.text())
            dispatch({type:ADD_USER_DATA, payload: text["data"]})
            showToast("Details Updated!")
        }else if(status === 400){
            showToast("Network Error", "error")
        }else if(status.toString()[0] === "5"){
            showToast("Network Error", "error")
        }

    }catch(e){
        console.log(e)
        console.log(e.stack)
        showToast("Network Error", "error")
    }
}

export const login_redux_api_call = (email, password) => async dispatch => {
    try{
        dispatch({type:API_BOOL, payload: true})
        dispatch({type: SIGNUP_BOOL, payload: false})
        let response = await login_api(email,password)
        let status = response.status
        console.log(status)
        if(status===200){
            let text = JSON.parse(await response.text())
            dispatch({type:LOGIN_BOOL, payload: true})
            dispatch({type: ADD_USER_DATA, payload: text["data"]})
            dispatch({type: TOKEN_DETAIL, payload: text["token"]})
        }else if(status===400){
            let text = JSON.parse(await response.text())
            console.log(text)
            dispatch({type: LOGIN_BOOL, payload: false})
            dispatch({type: LOGIN_ERROR, payload: text["error"]})
        }else if(status.toString()[0]==="5"){
            dispatch({type:LOGIN_BOOL, payload:false})
            showToast("Network Error", "error")
        }else{
            showToast("Network Error", "error")
        }
        dispatch({type:API_BOOL, payload: false})
    }catch(e){
        dispatch({type:LOGIN_BOOL, payload:false})
        console.log("error")
        console.log(e)
        console.log(e.stack)
        showToast("Network Error", "error")
        dispatch({type:API_BOOL, payload: false})
    }
}


export const signup_redux_api_call = (name, email, password, mobile, food_pref, email_pref) => async dispatch => {
    try{
        dispatch({type: CLEAR_USER_DATA, payload: {}})
        let response = await signup_api(name, email, password, mobile, food_pref, email_pref)
        let status = response.status
        if(status === 200){
            let text = await response.text()
            dispatch({type:SIGNUP_BOOL, payload: true})
        }else if(status == 400){
            let text = JSON.parse(await response.text())
            dispatch({type:SIGNUP_BOOL, payload: false})
            dispatch({type: SIGNUP_ERROR, payload: text["error"]})
            // this.setState({error: text["error"]})
        }else if(status.toString()[0] == "5"){
            dispatch({type:SIGNUP_BOOL, payload: false})
            showToast("Server Error", "error")
        }
    }catch(e){
        console.log("error")
        console.log(e.stack)
        dispatch({type:SIGNUP_BOOL, payload: false})
        dispatch({type: SIGNUP_ERROR, payload: "network error"})
    }
}

export const delete_user_redux_api_call = (token) => async dispatch => {
    try{
        let response = await delete_user_api(token)
        let status = response.status
        if(status===200){
            dispatch({type:CLEAR_USER_DATA, payload: {}})
            showToast("Account deleted successfully!")
        }else if(status ===400){
            showToast("Network Error", "error")
        }else if(status.toString()[0]==="5"){
            showToast("Server Error", "error")
        }
    }catch(e){
        console.log(e)
        console.log(e.stack)
        showToast("Network Error", "error")
    }
}


const showToast = (msg, type='success') => {
    Toast.show({
      type: type,
      text1: msg,
    });
}