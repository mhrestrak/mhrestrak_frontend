import http from "../httpService";

const apiEndpoint = "/resident/notes";

export async function getResidentNotes(resId) {
  let url = `${apiEndpoint}/${resId}`;
  try {
    return await http.get(url);
  } catch (error) {
    return { error };
  }
}

export async function createNote(data) {
 let url = `${apiEndpoint}`;
  try {
      return await http.post(url, data);
  } catch (error) {
    return {error}
  }
}

// export function getResidentByID(id) {
//   let url = `${apiEndpoint}/${id}`;
//   return http.get(url);
// }
// export function getAdmission(id) {
//   let url = `${apiEndpoint}/admission/${id}`;
//   return http.get(url);
// }

// export async function CreateResAdmission(data) {
//   let AdUrl = `${apiEndpoint}/admission`;
//   let AdResult = await http.post(AdUrl, data.admission);

//   if (data.legal.length > 0) {
//     try {
//       let url = `${apiEndpoint}/legal`;
//       data.legal.forEach(async (legal, i) => {
//         let result = await http.post(url, legal);
//       });
//     } catch (error) {
//       return error;
//     }
//   }
//   return AdResult;
// }