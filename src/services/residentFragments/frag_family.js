import http from "../httpService";

const apiEndpoint = "/resident/family";

export async function getResidentFamily(resId) {
  let url = `${apiEndpoint}/${resId}`;
  try {
    return await http.get(url);
  } catch (error) {
    return { error };
  }
}

// export async function createNote(data) {
//  let url = `${apiEndpoint}`;
//   try {
//       return await http.post(url, data);
//   } catch (error) {
//     return {error}
//   }
// }