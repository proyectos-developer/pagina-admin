import { constantes } from "./constantes"

export const categoriasConstants = (id = 1, data = {}, reset = false) => {
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
        get_categorias: {
            path: `categorias`,
            stateType: 'get_categorias',
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