import { constantes } from "./constantes"

export const negociosConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16,  data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_negocio: {
            path: `negocio`,
            stateType: 'new_negocio',
            reset: reset,
            data: data
        }, 
        update_negocio: {
            path: `negocio/${id}`,
            stateType: 'update_negocio',
            reset: reset,
            data: data
        },  
        get_negocios_filter: {
            path: `negocios/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_negocios_filter',
            reset: reset
        }, 
        get_negocio: {
            path: `negocio/${id}`,
            stateType: 'get_negocio',
            reset: reset
        },
        delete_negocio: {
            path: `delete/negocio/${id}`,
            stateType: 'delete_negocio',
            reset: reset
        }
    }
}