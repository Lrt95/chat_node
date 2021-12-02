import axios from "axios";
import Cookies from "universal-cookie";

async function postMessage(data, url, config = {}) {
    return await axios.post(url, data, config).then(result => {
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

export async function sendMessage(data) {
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token-user')}}
    let urlRouteSendMessage = "http://localhost:3050/api/message";
    return await postMessage(data, urlRouteSendMessage, config);
}
