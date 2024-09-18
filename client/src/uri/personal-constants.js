import { constantes } from "./constantes"

export const personalConstants = (id = 1, search = 0, id_departamento = 0, estado_trabajo = 0, order_by = 0, order = 0, begin = 0, amount = 16, 
        data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_personal: {
            path: `personal`,
            stateType: 'new_personal',
            reset: reset,
            data: data
        }, 
        update_personal: {
            path: `personal/${id}`,
            stateType: 'update_personal',
            reset: reset,
            data: data
        }, 
        update_estado_personal: {
            path: `personal/habilitado${id}`,
            stateType: 'update_estado_personal',
            reset: reset,
            data: data
        },  
        get_personal_filter: {
            path: `personal/search/${search}/empresa/${id_departamento}/estado/${estado_trabajo}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_personal_filter',
            reset: reset
        },   
        get_personal: {
            path: `personal/${id}`,
            stateType: 'get_personal',
            reset: reset
        },
        delete_personal: {
            path: `delete/personal/${id}`,
            stateType: 'delete_personal',
            reset: reset
        }
    }
}