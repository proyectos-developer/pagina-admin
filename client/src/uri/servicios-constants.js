import { constantes } from "./constantes"

export const serviciosConstants = (id = 1, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_servicio: {
            path: `servicio`,
            stateType: 'new_servicio',
            reset: reset,
            data: data
        }, 
        update_servicio: {
            path: `servicio/${id}`,
            stateType: 'update_servicio',
            reset: reset,
            data: data
        },  
        get_servicios: {
            path: `servicios`,
            stateType: 'get_servicios',
            reset: reset
        },   
        get_servicio: {
            path: `servicio/${id}`,
            stateType: 'get_servicio',
            reset: reset
        },
        delete_servicio: {
            path: `delete/servicio/${id}`,
            stateType: 'delete_servicio',
            reset: reset
        }
    }
}