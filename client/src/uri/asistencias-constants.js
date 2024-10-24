import { constantes } from "./constantes"

export const asistenciasConstants = (id = 1, search = 0, fecha = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_asistencia: {
            path: `asistencia`,
            stateType: 'new_asistencia',
            reset: reset,
            data: data
        }, 
        update_asistencia: {
            path: `asistencia/${id}`,
            stateType: 'update_asistencia',
            reset: reset,
            data: data
        },  
        get_asistencias_filter: {
            path: `asistencias/search/${search}/fecha/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_asistencias_filter',
            reset: reset
        },   
        get_asistencia: {
            path: `asistencia/${id}`,
            stateType: 'get_asistencia',
            reset: reset
        },
        delete_asistencia: {
            path: `delete/asistencia/${id}`,
            stateType: 'delete_asistencia',
            reset: reset
        }
    }
}