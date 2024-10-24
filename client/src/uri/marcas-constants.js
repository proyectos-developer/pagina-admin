import { constantes } from "./constantes"

export const marcasConstants = (id = 1, search = '', order_by = '', order = '', begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_marca: {
            path: `marca`,
            stateType: 'new_marca',
            reset: reset,
            data: data
        }, 
        update_marca: {
            path: `marca/${id}`,
            stateType: 'update_marca',
            reset: reset,
            data: data
        },  
        get_marcas_filter: {
            path: `marcas/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_marcas_filter',
            reset: reset
        },
        get_marca: {
            path: `marca/${id}`,
            stateType: 'get_marca',
            reset: reset
        },  
        delete_marca: {
            path: `delete/marca/${id}`,
            stateType: 'delete_marca',
            reset: reset
        }
    }
}