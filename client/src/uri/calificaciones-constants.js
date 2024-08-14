import { constantes } from "./constantes"

export const calificacionesConstants = (id = 1, begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_calificacion: {
            path: `calificacion`,
            stateType: 'new_calificacion',
            reset: reset,
            data: data
        }, 
        get_calificaciones: {
            path: `calificaciones/${begin}/${amount}`,
            stateType: 'get_calificaciones',
            reset: reset,
        },  
        get_calificaciones_producto: {
            path: `calificaciones/producto/clientes/${id}`,
            stateType: 'get_calificaciones_producto',
            reset: reset
        },   
        delete_calificacion_cliente: {
            path: `delete/calificacion/${id}`,
            stateType: 'delete_calificacion_cliente',
            reset: reset
        }
    }
}