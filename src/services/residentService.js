import http from "./httpService";

const apiEndpoint = "/resident";

export function findResident(ssn, name) {
  let url = `${apiEndpoint}${(ssn || name) && "?"}${ssn ? "ssn=" + ssn : ""}${
    ssn ? (name ? "&name=" + name : "") : name ? "name=" + name : ""
  }`;
  return http.get(url);
}

export async function CreateResidentWithSections(data) {
  if (data.basic.SSN) {
    try {
      let url = `${apiEndpoint}/basic`;
      let result = await http.post(url, data.basic);
      console.log(result);
    } catch (error) {
      console.log("error");
      console.log(error);
      return error;
    }
  }
  if (data.family.length > 0) {
    try {
      let url = `${apiEndpoint}/family`;
      data.family.forEach(async (family, i) => {
        let result = await http.post(url, family);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.contact.ContactFirstName) {
    try {
      let url = `${apiEndpoint}/contacts`;
      let result = await http.post(url, data.contact);
      console.log(result);
    } catch (error) {
      return error;
    }
  }
  if (data.notes.NoteCategoryListID) {
    try {
      let url = `${apiEndpoint}/notes`;
      let result = await http.post(url, data.notes);
      console.log(result);
    } catch (error) {
      return error;
    }
  }
  if (data.education.length > 0) {
    try {
      let url = `${apiEndpoint}/education`;
      data.education.forEach(async (educ, i) => {
        let result = await http.post(url, educ);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.employment.JobTitle) {
    try {
      let url = `${apiEndpoint}/employment`;
      let result = await http.post(url, data.employment);
      console.log(result);
    } catch (error) {
      return error;
    }
  }
  if (data.drugs.length > 0) {
    try {
      let url = `${apiEndpoint}/drug`;
      data.drugs.forEach(async (drugs, i) => {
        let result = await http.post(url, drugs);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.legal.length > 0) {
    try {
      let url = `${apiEndpoint}/legal`;
      data.legal.forEach(async (legal, i) => {
        let result = await http.post(url, legal);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.finances.length > 0) {
    try {
      let url = `${apiEndpoint}/finance`;
      data.finances.forEach(async (finance, i) => {
        let result = await http.post(url, finance);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.medical.length > 0) {
    try {
      let url = `${apiEndpoint}/medical`;
      data.medical.forEach(async (medical, i) => {
        let result = await http.post(url, medical);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  if (data.medication.length > 0) {
    try {
      let url = `${apiEndpoint}/medication`;
      data.medication.forEach(async (medication, i) => {
        let result = await http.post(url, medication);
        console.log(result);
      });
    } catch (error) {
      return error;
    }
  }
  console.log("done");
  return { ResID: data.basic.ResID };
}
