import axios from "axios";
import Cookies from "universal-cookie"

async function postUser(data, url) {
    return await axios.post(url, data).then(result => {
        return result.data
    }).catch(
        err => {
            if(err.response){
                return err.response.data;
            }else{
                return err
            }

        }
    )
}

async function updateUser(data, url, config = {withCredentials: true}) {
    return await axios.post(url, data, {withCredentials: true}).then(result => {
        return result.data
    }).catch(
        err => {
            if(err.response){
                return err.response.data;
            }else{
                return err
            }

        }
    )
}

export async function setSignUp(data) {
    let urlRoutePostSignUp = "http://localhost:3050/api/users";
    return await postUser(data, urlRoutePostSignUp);
}

export async function setSignIn(data) {
    let urlRoutePostSignUp = "http://localhost:3050/api/user-signin";
    return await postUser(data, urlRoutePostSignUp);
}

export async function setUpdateUser(data) {
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token-user')}}
    let urlRoutePostSignUp = "http://localhost:3050/api/update-users";
    return await updateUser(data, urlRoutePostSignUp,config);
}

export async function setNewPassword(data) {
    let urlRoutePostSignUp = "http://localhost:3050/api/forgot-password";
    return await updateUser(data, urlRoutePostSignUp);
}
