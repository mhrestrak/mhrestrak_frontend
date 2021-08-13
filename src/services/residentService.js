import http from "./httpService";

const apiEndpoint = "/resident";

export function findResident(ssn, name) {
  let url = `${apiEndpoint}${(ssn || name) && "?"}${ssn ? "ssn=" + ssn : ""}${
    ssn ? (name ? "&name=" + name : "") : name ? "name=" + name : ""
  }`;
  return http.get(url);
}
