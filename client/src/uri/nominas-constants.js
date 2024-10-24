import { constantes } from "./constantes"

export const nominasConstants = (id = 1, search = 0, fecha = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_nomina: {
            path: `nomina`,
            stateType: 'new_nomina',
            reset: reset,
            data: data
        }, 
        update_nomina: {
            path: `nomina/${id}`,
            stateType: 'update_nomina',
            reset: reset,
            data: data
        },  
        get_nominas_filter: {
            path: `nominas/search/${search}/fecha/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_nominas_filter',
            reset: reset
        },   
        get_nomina: {
            path: `nomina/${id}`,
            stateType: 'get_nomina',
            reset: reset
        },
        delete_nomina: {
            path: `delete/nomina/${id}`,
            stateType: 'delete_nomina',
            reset: reset
        }
    }
}