import { constantes } from "./constantes"

export const calificacionesConstants = (id = 1, tipo = 0, id_tipo = 0, search = 0, order_by = 0, order = 0, begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_calificacion: {
            path: `calificacion`,
            stateType: 'new_calificacion',
            reset: reset,
            data: data
        }, 
        get_calificaciones_filter: {
            path: `calificaciones/search/${search}/tipo/${tipo}/${id_tipo}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_calificaciones_filter',
            reset: reset,
        },  
        get_clientes_producto_calificacion_filter: {
            path: `calificaciones/producto/clientes/${id}/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_clientes_producto_calificacion_filter',
            reset: reset
        },   
        delete_calificacion_cliente: {
            path: `delete/calificacion/${id}`,
            stateType: 'delete_calificacion_cliente',
            reset: reset
        }
    }
}