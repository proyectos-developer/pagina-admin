import { constantes } from "./constantes"

export const subcategoriasConstants = (id = 1, search = 0, id_categoria = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
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
        get_subcategorias_filter: {
            path: `subcategorias/search/${search}/categoria/${id_categoria}/order_by/${order_by}/${order}/${begin}/${amount}/`,
            stateType: 'get_subcategorias_filter',
            reset: reset
        },   
        get_subcategoria: {
            path: `subcategoria/${id}`,
            stateType: 'get_subcategoria',
            reset: reset
        },   
        get_subcategorias_categoria: {
            path: `subcategorias/categoria/${id}`,
            stateType: 'get_subcategorias_categoria',
            reset: reset
        },
        delete_subcategoria: {
            path: `delete/subcategoria/${id}`,
            stateType: 'delete_subcategoria',
            reset: reset
        }
    }
}