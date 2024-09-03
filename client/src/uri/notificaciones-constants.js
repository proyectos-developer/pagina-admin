import { constantes } from "./constantes"

export const notificacionesConstants = (id = 1, search = 0, id_tipo = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_notificacion: {
            path: `notificacion`,
            stateType: 'new_notificacion',
            reset: reset,
            data: data
        }, 
        update_notificacion: {
            path: `notificacion/${id}`,
            stateType: 'update_notificacion',
            reset: reset,
            data: data
        },   
        update_notificacion_leida: {
            path: `lectura/notificacion/${id}/${begin}/${amount}`,
            stateType: 'update_notificacion_leida',
            reset: reset,
            data: data
        },  
        get_notificaciones_filter: {
            path: `notificaciones/search/${search}/tipo/${id_tipo}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_notificaciones_filter',
            reset: reset
        },   
        get_notificacion: {
            path: `notificacion/${id}`,
            stateType: 'get_notificacion',
            reset: reset
        },
        delete_notificacion: {
            path: `delete/notificacion/${id}`,
            stateType: 'delete_notificacion',
            reset: reset
        },
        get_nro_notificaciones: {
            path: `nro/notificaciones`,
            stateType: 'get_nro_notificaciones',
            reset: reset
        }
    }
}