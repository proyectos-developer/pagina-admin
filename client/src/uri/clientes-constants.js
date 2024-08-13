import { constantes } from "./constantes"

export const clientesConstants = (id = 1, search = '', begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        update_estado_cliente: {
            path: `admin/cliente/${id}`,
            stateType: 'update_estado_cliente',
            reset: reset,
            data: data
        },
        get_clientes: {
            path: `clientes/search/${search}/${begin}/${amount}`,
            stateType: 'get_clientes',
            reset: reset
        }, 
        get_cliente: {
            path: `cliente/${id}`,
            stateType: 'get_cliente',
            reset: reset
        }
    }
}