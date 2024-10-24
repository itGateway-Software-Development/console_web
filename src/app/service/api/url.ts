const {VITE_API_BASE_URL} = import.meta.env;
const {VITE_API_ACCESS_TOKEN} = import.meta.env;

const url = VITE_API_BASE_URL;
const api_token = encodeURIComponent(VITE_API_ACCESS_TOKEN);

let api = {
    headers(token: String) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`,   
                'Content-Type': 'multipart/form-data'
            }
        }
    },
    login: url + 'login?api_token='+ api_token,
    register: url + 'register?api_token='+ api_token,
    verify_email: url + 'verify-email?api_token=' + api_token,
    update_profile: url + 'update-profile?api_token=' + api_token,
    change_password: url + 'change-password?api_token=' + api_token,
    send_pw_reset_code: url + 'send-pw-reset-code?api_token=' + api_token,
    check_pw_reset_code: url + 'check-pw-reset-code?api_token=' + api_token,
    reset_pw: url + 'reset-pw?api_token=' + api_token,

    // location api
    locations: url + 'locations?api_token=' + api_token,
    update_location(id:String|number) {
        return url + 'location/' + id + '?api_token=' + api_token
    }, 
    delete_location(id: String|number) {
        return url + 'locations/' + id + '?api_token=' + api_token
    },
    delete_multi_location: url + 'del/multi-locations?api_token=' + api_token,

    // server types api
    server_types: url + 'server-types?api_token=' + api_token,
    update_server_types(id:String|number) {
        return url + 'server-type/' + id + '?api_token=' + api_token
    }, 
    delete_server_types(id: String|number) {
        return url + 'server-types/' + id + '?api_token=' + api_token
    },
    delete_multi_server_types: url + 'del/multi-server-types?api_token=' + api_token,
};

export default api;