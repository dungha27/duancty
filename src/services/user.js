import { toast } from "react-toastify";
import http from "../http-common";

export const getUser = async (params) => {
    try {
        const response = await http.get("/users", { params: params });
        return response;
    }
    catch(err) {
        toast.error(err.message)
    }
};
