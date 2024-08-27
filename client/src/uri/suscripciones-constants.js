import { constantes } from "./constantes"

export const suscripcionesConstants = (id = 1, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_suscripcion: {
            path: `suscripcion`,
            stateType: 'new_suscripcion',
            reset: reset,
            data: data
        }, 
        get_suscripciones_filter: {
            path: `suscripciones/${begin}/${amount}`,
            stateType: 'get_suscripciones_filter',
            reset: reset,
        },  
        get_cliente_suscripcion: {
            path: `cliente/suscriptor/${id}`,
            stateType: 'get_cliente_suscripcion',
            reset: reset,
        },
        delete_suscripcion: {
            path: `delete/suscripcion/${id}`,
            stateType: 'delete_suscripcion',
            reset: reset
        }
    }
}