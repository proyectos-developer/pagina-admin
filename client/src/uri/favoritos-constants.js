import { constantes } from "./constantes"

export const favoritosConstants = (id = 1, tipo = 0, id_tipo = 0, search = 0, order_by = 0, order = 0, begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_favorito: {
            path: `favorito`,
            stateType: 'new_favorito',
            reset: reset,
            data: data
        }, 
        get_favoritos_filter: {
            path: `favoritos/search/${search}/tipo/${tipo}/${id_tipo}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_favoritos_filter',
            reset: reset,
        },  
        get_clientes_producto_favorito_filter: {
            path: `favorito/producto/clientes/${id}/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_clientes_producto_favorito_filter',
            reset: reset
        },   
        delete_favorito_cliente: {
            path: `delete/favorito/${id}`,
            stateType: 'delete_favorito_cliente',
            reset: reset
        }
    }
}