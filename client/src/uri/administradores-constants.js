import { constantes } from "./constantes"

export const administradoresConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, 
        data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_administrador: {
            path: `administrador`,
            stateType: 'new_administrador',
            reset: reset,
            data: data
        }, 
        update_administrador: {
            path: `administrador/${id}`,
            stateType: 'update_administrador',
            reset: reset,
            data: data
        }, 
        update_administrador_habilitado: {
            path: `administrador/habilitado${id}`,
            stateType: 'update_administrador_habilitado',
            reset: reset,
            data: data
        },  
        get_administradores: {
            path: `administradores/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_administradores',
            reset: reset
        },   
        get_administrador: {
            path: `administrador/${id}`,
            stateType: 'get_administrador',
            reset: reset
        },
        delete_administrador: {
            path: `delete/administrador/${id}`,
            stateType: 'delete_administrador',
            reset: reset
        }
    }
}