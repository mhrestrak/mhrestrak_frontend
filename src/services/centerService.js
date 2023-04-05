import http from "./httpService";

const apiEndpoint = "/centers";

export async function getAllCenters(){
  let { data } = await http.get(apiEndpoint);
  if (data) {
    return data
  } else {
    return [];
  }
}
