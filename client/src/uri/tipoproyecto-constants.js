import { constantes } from "./constantes"

export const tipoproyectoConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, 
        data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_tipo_proyecto: {
            path: `tipo_proyecto`,
            stateType: 'new_tipo_proyecto',
            reset: reset,
            data: data
        }, 
        update_tipo_proyecto: {
            path: `tipo_proyecto/${id}`,
            stateType: 'update_tipo_proyecto',
            reset: reset,
            data: data
        },  
        get_tipo_proyectos_filter: {
            path: `tipo_proyectos/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_tipo_proyectos_filter',
            reset: reset
        }, 
        get_tipo_proyecto: {
            path: `tipo_proyecto/${id}`,
            stateType: 'get_tipo_proyecto',
            reset: reset
        },
        delete_tipo_proyecto: {
            path: `delete/tipo_proyecto/${id}`,
            stateType: 'delete_tipo_proyecto',
            reset: reset
        }
    }
}