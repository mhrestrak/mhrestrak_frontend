import http from "../httpService";

const apiEndpoint = "/users/admin";

export async function getUsers(selectedFilters) {
  let url = `${apiEndpoint}/getUsers`;
  try {
    return await http.post(url, selectedFilters);
  } catch (error) {
    return { error };
  }
}

export function getUserByID(id) {
  let url = `${apiEndpoint}/${id}`;
  return http.get(url);
}

export function getUserStatus(id) {
  let url = `${apiEndpoint}/status/${id}`;
  return http.get(url);
}

export async function updateUser(userData) {
  let url = `${apiEndpoint}/updateUser`;
  try {
    return await http.put(url, userData);
  } catch (error) {
    return { error };
  }
}

export async function updateUserRole(userData) {
  let url = `${apiEndpoint}/updateUserRole`;
  try {
    return await http.put(url, userData);
  } catch (error) {
    return { error };
  }
}

export async function inviteUser(userData) {
  let url = `${apiEndpoint}/inviteUser`;
  try {
    return await http.post(url, userData);
  } catch (error) {
    return { error };
  }
}
