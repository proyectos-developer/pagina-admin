import { constantes } from "./constantes"

export const productosConstants = (id = 1, search = '', id_categoria = '', categoria = '', minimo = 0,
        maximo = 0, order_by = '', order = '', begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_producto: {
            path: `producto`,
            stateType: 'new_producto',
            reset: reset,
            data: data
        }, 
        update_producto: {
            path: `producto/${id}`,
            stateType: 'update_producto',
            reset: reset,
            data: data
        },  
        get_productos_filter: {
            path: `productos/search/${search}/categoria/${id_categoria}/precio/${minimo}/${maximo}/orderby/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_productos_filter',
            reset: reset
        },   
        get_producto: {
            path: `producto/${id}`,
            stateType: 'get_producto',
            reset: reset
        },
        delete_producto: {
            path: `delete/producto/${id}`,
            stateType: 'delete_producto',
            reset: reset
        }
    }
}