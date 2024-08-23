import { constantes } from "./constantes"

export const unidadesConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_unidad: {
            path: `unidad`,
            stateType: 'new_unidad',
            reset: reset,
            data: data
        }, 
        update_unidad: {
            path: `unidad/${id}`,
            stateType: 'update_unidad',
            reset: reset,
            data: data
        },  
        get_unidades_filter: {
            path: `unidades/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_unidades_filter',
            reset: reset
        },   
        get_unidad: {
            path: `unidad/${id}`,
            stateType: 'get_unidad',
            reset: reset
        },
        delete_unidad: {
            path: `delete/unidad/${id}`,
            stateType: 'delete_unidad',
            reset: reset
        }
    }
}