import { constantes } from "./constantes"

export const reunionesConstants = (id = 1, search = 0, fecha = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_reunion: {
            path: `reunion`,
            stateType: 'new_reunion',
            reset: reset,
            data: data
        }, 
        update_reunion: {
            path: `reunion/${id}`,
            stateType: 'update_reunion',
            reset: reset,
            data: data
        },    
        update_reunion_leida: {
            path: `lectura/reunion/${id}/${begin}/${amount}`,
            stateType: 'update_reunion_leida',
            reset: reset,
            data: data
        }, 
        get_reuniones_filter: {
            path: `reuniones/search/${search}/fecha/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_reuniones_filter',
            reset: reset
        },   
        get_reunion: {
            path: `reunion/${id}`,
            stateType: 'get_reunion',
            reset: reset
        },
        delete_reunion: {
            path: `delete/reunion/${id}`,
            stateType: 'delete_reunion',
            reset: reset
        },
        get_nro_reuniones: {
            path: `nro/reuniones`,
            stateType: 'get_nro_reuniones',
            reset: reset
        }
    }
}