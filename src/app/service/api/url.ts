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

    // Auth api 
    login: url + 'login?api_token='+ api_token,
    register: url + 'register?api_token='+ api_token,
    verify_email: url + 'verify-email?api_token=' + api_token,
    update_profile: url + 'update-profile?api_token=' + api_token,
    change_password: url + 'change-password?api_token=' + api_token,
    send_pw_reset_code: url + 'send-pw-reset-code?api_token=' + api_token,
    check_pw_reset_code: url + 'check-pw-reset-code?api_token=' + api_token,
    reset_pw: url + 'reset-pw?api_token=' + api_token,
    is_still_authenticated: url + 'check-auth?api_token=' + api_token,
    deploy: url+ "run-script",
    get_deploy_servers: url+ "deploy-servers",
    delete_deploy_servers: url+ "delete-deploy-server",
};

export default api;