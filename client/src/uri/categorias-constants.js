import { constantes } from "./constantes"

export const categoriasConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_categoria: {
            path: `categoria`,
            stateType: 'new_categoria',
            reset: reset,
            data: data
        }, 
        update_categoria: {
            path: `categoria/${id}`,
            stateType: 'update_categoria',
            reset: reset,
            data: data
        },  
        get_categorias_filter: {
            path: `categorias/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_categorias_filter',
            reset: reset
        },   
        get_categoria: {
            path: `categoria/${id}`,
            stateType: 'get_categoria',
            reset: reset
        },
        delete_categoria: {
            path: `delete/categoria/${id}`,
            stateType: 'delete_categoria',
            reset: reset
        }
    }
}