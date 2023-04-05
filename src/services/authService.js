/* eslint-disable import/no-anonymous-default-export */
import jwtDecode from "jwt-decode";

import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, pass) {
  const { data: jwt } = await http.post(apiEndpoint, { email, pass });
  localStorage.setItem(tokenKey, jwt);
}

export async function updateProfile(data) {
  const { data: jwt } = await http.put(apiEndpoint+"/updateProfile", data);
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
  // console.log(tokenKey, jwt);
  return true
}

export async function activateUser(data) {
  const { data: jwt } = await http.put(apiEndpoint+"/activateUser", data);
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
  // console.log(tokenKey, jwt);
  return true
}

export async function getUserStatus(data) {
  const { data: jwt } = await http.put(apiEndpoint+"/activateUser", data);
  localStorage.setItem(tokenKey, jwt);
  // console.log(tokenKey, jwt);
  return true
}



export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  updateProfile
};
