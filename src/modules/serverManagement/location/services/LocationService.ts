import api from "@/app/service/api/url";
import axios from "axios";
import { LocationPayload } from "../types/LocationType";

export default class LocationService {
    async getLocations(token: String) {
        try {
            const response = await axios.get(api.locations, api.headers(token));

            return response;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.response?.data?.message || "Something Wrong");
        }
    }
    
    async store(token: String, payload:LocationPayload) {
        const response = await axios.post(api.locations, payload, api.headers(token));

        return response;
    }

    async update(token: String, id: String|number, payload:LocationPayload) {
        const response = await axios.post(api.update_location(id), payload, api.headers(token));

        return response;
    }

    async delete(token: String, id: String|number) {
        const response = await axios.delete(api.delete_location(id), api.headers(token));

        return response;
    }

    async deleteMulti(token: String, ids: Object) {
        const response = await axios.post(api.delete_multi_location, ids, api.headers(token));

        return response;
    }
}