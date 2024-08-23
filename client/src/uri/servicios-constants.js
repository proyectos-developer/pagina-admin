import { constantes } from "./constantes"

export const serviciosConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
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
        get_servicios_filter: {
            path: `servicios/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_servicios_filter',
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