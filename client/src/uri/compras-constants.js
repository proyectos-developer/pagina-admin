import { constantes } from "./constantes"

export const comprasConstants = (id = 1, shop_id = '', search = 0, order_by = 0, order = 0, begin = '', amount = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_compra: {
            path: `compra`,
            stateType: 'new_compra',
            reset: reset,
            data: data
        }, 
        update_compra: {
            path: `compra/${id}`,
            stateType: 'update_compra',
            reset: reset,
            data: data
        },  
        get_compras_filter: {
            path: `compras/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_compras_filter',
            reset: reset
        },   
        get_productos_compra: {
            path: `compras/productos/${shop_id}/${begin}/${amount}`,
            stateType: 'get_productos_compra',
            reset: reset
        },
        delete_producto_compra: {
            path: `delete/compra/${id}/${shop_id}`,
            stateType: 'delete_producto_compra',
            reset: reset
        }
    }
}