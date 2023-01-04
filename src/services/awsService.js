/* eslint-disable import/no-anonymous-default-export */
import http from "./httpService";

const tokenKey = "token";

http.setJwt(localStorage.getItem(tokenKey));

const baseURL = "resources/aws"

const getSignedUrl = async (fileName, fileType) => {
    const endpoint = `${baseURL}/uploadUrl/${fileName}?type=${fileType}`;
    try {
        const res = await http.get(endpoint);
        return res.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteObject = async (fileName) => {
    const endpoint = `${baseURL}/deleteFile`;
    try {
        const res = await http.put(endpoint, {fileName});
        return res.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

export default {
    getSignedUrl,
    deleteObject,
}