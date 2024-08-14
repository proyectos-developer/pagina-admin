import { constantes } from "./constantes"

export const favoritosConstants = (id = 1, begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_favorito: {
            path: `favorito`,
            stateType: 'new_favorito',
            reset: reset,
            data: data
        }, 
        get_favoritos: {
            path: `favoritos/${begin}/${amount}`,
            stateType: 'get_favoritos',
            reset: reset,
        },  
        get_clientes_producto_favorito: {
            path: `favoritos/producto/clientes/${id}`,
            stateType: 'get_clientes_producto_favorito',
            reset: reset
        },   
        delete_favorito_cliente: {
            path: `delete/favorito/${id}`,
            stateType: 'delete_favorito_cliente',
            reset: reset
        }
    }
}