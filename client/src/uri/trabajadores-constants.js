import { constantes } from "./constantes"

export const trabajadoresConstants = (id = 1, search = 0, id_area_trabajo = 0, estado_trabajo = 0, order_by = 0, order = 0, begin = 0, amount = 16, 
        data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_trabajador: {
            path: `trabajador`,
            stateType: 'new_trabajador',
            reset: reset,
            data: data
        }, 
        update_trabajador: {
            path: `trabajador/${id}`,
            stateType: 'update_trabajador',
            reset: reset,
            data: data
        }, 
        update_estado_trabajador: {
            path: `trabajador/habilitado${id}`,
            stateType: 'update_estado_trabajador',
            reset: reset,
            data: data
        },  
        get_trabajadores: {
            path: `trabajadores/search/${search}/empresa/${id_area_trabajo}/estado/${estado_trabajo}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_trabajadores',
            reset: reset
        },   
        get_trabajador: {
            path: `trabajador/${id}`,
            stateType: 'get_trabajador',
            reset: reset
        },
        delete_trabajador: {
            path: `delete/trabajador/${id}`,
            stateType: 'delete_trabajador',
            reset: reset
        }
    }
}