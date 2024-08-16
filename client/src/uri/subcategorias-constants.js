import { constantes } from "./constantes"

export const subcategoriasConstants = (id = 1, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_subcategoria: {
            path: `subcategoria`,
            stateType: 'new_subcategoria',
            reset: reset,
            data: data
        }, 
        update_subcategoria: {
            path: `subcategoria/${id}`,
            stateType: 'update_subcategoria',
            reset: reset,
            data: data
        },  
        get_subcategorias: {
            path: `subcategorias`,
            stateType: 'get_subcategorias',
            reset: reset
        },   
        get_subcategoria: {
            path: `subcategoria/${id}`,
            stateType: 'get_subcategoria',
            reset: reset
        },   
        get_subcategorias_categoria: {
            path: `subcategoria/categoria/${id}`,
            stateType: 'get_subcategoria',
            reset: reset
        },
        delete_subcategoria: {
            path: `delete/subcategoria/${id}`,
            stateType: 'delete_subcategoria',
            reset: reset
        }
    }
}