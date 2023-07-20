import { toast } from "react-toastify";
import api from "../api";

export const getUser = async (params) => {
    try {
        const response = await api.get("/users", { params: params });
        return response;
    }
    catch(err) {
        toast.error(err.message)
    }
};
