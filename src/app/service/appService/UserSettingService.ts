import axios from 'axios'
import api from "../api/url";

export default class UserSettingService {
    async updateProfile(payload:any, token:String) {
        try {
            const { id, name, phone, address } = payload;

            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("address", address);
        
            const response = await axios.post(api.update_profile, formData, api.headers(token));
      
            return response;
          } catch (error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Update failed");
            }
        }
    }

    async changePassword(payload: any, token: String) {
        try {
            const {id, old_password, new_password, new_password_confirmation} = payload;

            const formData = new FormData();
            formData.append('id', id);
            formData.append('old_password', old_password);
            formData.append('new_password', new_password);
            formData.append('new_password_confirmation', new_password_confirmation);

            const response = await axios.post(api.change_password, formData, api.headers(token));

            return response;

        }catch(error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Update failed");
            }
        }
    }

    async sendPwResetCode(email: any) {
        try {
            const formData = new FormData();
            formData.append('email', email);

            const response = await axios.post(api.send_pw_reset_code, formData);

            return response;

        }catch(error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Update failed");
            }
        }
    }

    async checkPwResetCode(payload: any) {
        try {
            const {email, resetCode} = payload

            const formData = new FormData();
            formData.append('email', email);
            formData.append('resetCode', resetCode);

            const response = await axios.post(api.check_pw_reset_code, formData);

            return response;

        }catch(error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Update failed");
            }
        }
    }

    async resetPassword(payload: any) {
        try {
            const { email, new_password, new_password_confirmation } = payload;

            const formData = new FormData();
            formData.append('email', email);
            formData.append('new_password', new_password);
            formData.append('new_password_confirmation', new_password_confirmation);

            const response = await axios.post(api.reset_pw, formData);

            return response;

        }catch(error: any) {
            console.log(error);
            if(error.status == 422) {
                throw new Error('Invalid credential!')
            } else {
                throw new Error(error.response?.data?.message || "Update failed");
            }
        }
    }
}