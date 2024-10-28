import api from "@/app/service/api/url";
import axios from "axios";
import { ServerTypePayload } from "../types/ServerTypesType";

export default class ServerTypeService {
    async getServerTypes(token: String) {
        try {
            const response = await axios.get(api.server_types, api.headers(token));

            return response;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.response?.data?.message || "Something Wrong");
        }
    }
    
    async store(token: String, payload:ServerTypePayload) {
        const response = await axios.post(api.server_types, payload, api.headers(token));

        return response;
    }

    async update(token: String, id: String|number, payload:ServerTypePayload) {
        const response = await axios.post(api.update_server_types(id), payload, api.headers(token));

        return response;
    }

    async delete(token: String, id: String|number) {
        const response = await axios.delete(api.delete_server_types(id), api.headers(token));

        return response;
    }

    async deleteMulti(token: String, ids: Object) {
        const response = await axios.post(api.delete_multi_server_types, ids, api.headers(token));

        return response;
    }
}