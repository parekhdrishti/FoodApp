let url = "https://9db0-2405-201-17-f10d-2a-1575-4bc6-86a0.ngrok.io/"

let signup_url = url+"signup/"
let login_url = url + "login/"
let update_user_url = url + "updateUser/"
let delete_user_url = url + "deleteUser/"
let get_recepes_url = url + "getRecipes/"
let search_recipe_url = url + "search/"
let rate_recipe_url = url + "rateRecipe/"
let fav_recipe_url = url + "favouriteRecipe/"
let unfav_recipe_url = url + "unFavouriteRecipe/"
let get_fav_url = url + "getFavourites/"
let mail_url = url + "sendmail/"
let otp_url = url + "sendotp/"

export let otp_api = async (to_email, subject, otp) => {
    console.log([to_email, subject, otp])
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"subject":subject,"to_email":to_email,"otp":otp});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(otp_url, requestOptions)
    return response
}

export let mail_api = async (to_email, sender_email, mobile, name, requested_recipe, additional_notes, subject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"subject":subject ,"to_email":to_email, "sender_email":sender_email, "mobile":mobile, "name":name, "requested_recipe":requested_recipe, "additional_notes":additional_notes});
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(mail_url, requestOptions)
    return response
}

export let get_fav_api = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response= await fetch(get_fav_url, requestOptions)
    return response
}

export let fav_recipe_api = async (token, id) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(fav_recipe_url+id+"/", requestOptions)
    return response
}

export let unfav_recipe_api = async (token, id) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(unfav_recipe_url+id+"/", requestOptions)
    return response 
}

export let rate_recipe_api = async(token, id, rating) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"rating":rating});

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(rate_recipe_url+id+"/", requestOptions)
    return response
}

export let search_recipe_api = async(token, keyword) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(search_recipe_url+keyword+"/", requestOptions)
    return response
}

export let get_recepes_api = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(get_recepes_url, requestOptions)
    return response
}

export let delete_user_api = async (token) =>{
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);

    var raw = "";

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(delete_user_url, requestOptions)
    return response
}

export let signup_api = async (name, email, password, mobile, food_preference, email_preference) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name":name, "email":email, "password":password, "mobile":mobile, "foodPreference":food_preference,"emailPreference":email_preference, "isAdmin":false});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(signup_url, requestOptions)
    return response
}

export let login_api = async(email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"email":email,"password":password});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(login_url, requestOptions)
    return response
}

export let update_user_api = async(token, obj) => {
    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(obj);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(update_user_url, requestOptions)
    return response
}