import axios from "axios";

async function getRooms(data, url) {
    return await axios.get( url + data).then(result => {
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
    let urlSearch = "http://localhost:3050/api/rooms"
    return await getRooms("", urlSearch)
}
