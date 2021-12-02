import axios from "axios";
import Cookies from "universal-cookie";

async function getRooms(data, url, config = {}) {
    return await axios.get( url + data, config).then(result => {
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

export async function getAllRooms(){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token-user')}}
    let urlSearch = "http://localhost:3050/api/rooms"
    return await getRooms("", urlSearch, config)
}

export async function getRoom(id){
    const config = {headers: {'Authorization': 'Bearer ' + new Cookies().get('token-user')}}
    let urlSearch = "http://localhost:3050/api/room/"
    return await getRooms(id, urlSearch, config)
}
