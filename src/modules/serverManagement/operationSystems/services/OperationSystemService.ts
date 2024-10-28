import api from "@/app/service/api/url";
import axios from "axios";
import { OperationSystemPayload } from "../types/OperationSystemType";

export default class OperationSystemService {
    async getOperationSystems(token: String) {
        try {
            const response = await axios.get(api.operation_systems, api.headers(token));

            return response;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.response?.data?.message || "Something Wrong");
        }
    }
    
    async store(token: String, payload:OperationSystemPayload) {
        try {
            const response = await axios.post(api.operation_systems, payload, api.headers(token));

            return response;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.response?.data?.message || "Something Wrong");
        }
    }

    async update(token: String, id: String|number, payload:OperationSystemPayload) {
        const response = await axios.post(api.update_operation_systems(id), payload, api.headers(token));

        return response;
    }

    async delete(token: String, id: String|number) {
        const response = await axios.delete(api.delete_operation_systems(id), api.headers(token));

        return response;
    }

    async deleteMulti(token: String, ids: Object) {
        const response = await axios.post(api.delete_multi_operation_systems, ids, api.headers(token));

        return response;
    }
}