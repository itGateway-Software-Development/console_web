import { UserType } from "@/app/service/httpService/types.ts";
import axios from 'axios'
import api from "../../../app/service/api/url";
import { LS_KEY_USER } from "@/app/const.ts";
import LocalStorage from "@/app/service/localStorageService.ts";

const userLocalStorage = new LocalStorage(LS_KEY_USER);

export default class AuthService {

    async register(payload:UserType) {
        try {
            const { email, password, name, password_confirmation } = payload;

            const formData = new FormData();
            formData.append("email", email!);
            formData.append("name", name);
            formData.append("password", password);
            formData.append("password_confirmation", password_confirmation);
      
            const response = await axios.post(api.register, formData);
      
            return response;
          } catch (error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Registration failed");
            }
        }
    }

    async login(payload:UserType) {
        try {
            const { email, password } = payload;

            const formData = new FormData();
            formData.append("email", email!);
            formData.append("password", password);
      
            const response = await axios.post(api.login, formData);
      
            return response;
          } catch (error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Login failed");
            }
        }
    }

    async isStillAuthenticated(payload: {token: String, email: String}) {
        try {
            const response = await axios.post(api.is_still_authenticated, payload, api.headers(payload.token));
            return response;
        } catch (error: any) {
            if(error.status == 422) {
                return error.response;
            } else {
                return error.response;
            }
        }
    }

    getUser() {
        return userLocalStorage.getItems();
      }

    removeUser() {
        userLocalStorage.removeItem();
      }
}