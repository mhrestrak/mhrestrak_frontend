import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
    return Promise.reject(error);
});

export async function uploadtoAws(url, data) {
    try {
        let res = await axios.put(url, data);
        if (res.status === 200) {
            return true;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}