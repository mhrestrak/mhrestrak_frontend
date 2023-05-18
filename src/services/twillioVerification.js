import http from "./httpService";

let apiEndpoint = "/verify"

export async function getCode(data){
    return await http.post(apiEndpoint+"/getCode", data);
}

export async function verifyCode(data) {
    return await http.post(apiEndpoint+"/verifyCode", data);
}