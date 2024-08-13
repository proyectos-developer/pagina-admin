import { constantes } from "./constantes"

export const beginConstants = (id = 1, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        local_signin: {
            path: `signin`,
            stateType: 'local_signin',
            reset: reset,
            data: data
        }, 
        local_signup: {
            path: `signup`,
            stateType: 'local_signup',
            reset: reset,
            data: data
        },
        local_cambio_password: {
            path: `local/update/password/${id}`,
            stateType: 'local_cambio_password',
            reset: reset,
            data: data
        },  
        local_logout: {
            path: `logout`,
            stateType: 'local_logout',
            reset: reset
        }
    }
}