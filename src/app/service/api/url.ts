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

    // operation system api
    operation_systems: url + 'operation-systems?api_token=' + api_token,
    update_operation_systems(id:String|number) {
        return url + 'operation-system/' + id + '?api_token=' + api_token
    }, 
    delete_operation_systems(id: String|number) {
        return url + 'operation-systems/' + id + '?api_token=' + api_token
    },
    delete_multi_operation_systems: url + 'del/multi-operation-systems?api_token=' + api_token
};

export default api;