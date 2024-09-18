import { constantes } from "./constantes"

export const departamentosConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_departamento: {
            path: `departamento`,
            stateType: 'new_departamento',
            reset: reset,
            data: data
        }, 
        update_departamento: {
            path: `departamento/${id}`,
            stateType: 'update_departamento',
            reset: reset,
            data: data
        },  
        get_departamentos_filter: {
            path: `departamentos/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_departamentos_filter',
            reset: reset
        },   
        get_departamento: {
            path: `departamento/${id}`,
            stateType: 'get_departamento',
            reset: reset
        },
        delete_departamento: {
            path: `delete/departamento/${id}`,
            stateType: 'delete_departamento',
            reset: reset
        }
    }
}