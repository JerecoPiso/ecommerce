import axios from "axios"
export const getMyCart = async (userId) => {
    const resp = await axios.get(axios.defaults.baseURL + "getCartByUser/" + userId);
    return resp.data;
}