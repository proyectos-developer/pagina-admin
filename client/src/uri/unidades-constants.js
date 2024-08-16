import { constantes } from "./constantes"

export const unidadesConstants = (id = 1, data = {}, reset = false) => {
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
        get_unidades: {
            path: `unidades`,
            stateType: 'get_unidades',
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