import { constantes } from "./constantes"

export const mensajesConstants = (id = 1, search = 0, fecha = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_mensaje: {
            path: `mensaje`,
            stateType: 'new_mensaje',
            reset: reset,
            data: data
        }, 
        update_mensaje: {
            path: `mensaje/${id}`,
            stateType: 'update_mensaje',
            reset: reset,
            data: data
        },   
        update_mensaje_leida: {
            path: `lectura/mensaje/${id}/${begin}/${amount}`,
            stateType: 'update_mensaje_leida',
            reset: reset,
            data: data
        },   
        get_mensajes_filter: {
            path: `mensajes/search/${search}/fecha/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_mensajes_filter',
            reset: reset
        },   
        get_mensaje: {
            path: `mensaje/${id}`,
            stateType: 'get_mensaje',
            reset: reset
        },
        delete_mensaje: {
            path: `delete/mensaje/${id}`,
            stateType: 'delete_mensaje',
            reset: reset
        },
        get_nro_mensajes: {
            path: `nro/mensajes`,
            stateType: 'get_nro_mensajes',
            reset: reset
        }
    }
}