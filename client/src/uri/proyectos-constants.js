import { constantes } from "./constantes"

export const proyectosConstants = (id = 1, search = '', id_tipo = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_proyecto: {
            path: `proyecto`,
            stateType: 'new_proyecto',
            reset: reset,
            data: data
        }, 
        update_proyecto: {
            path: `proyecto/${id}`,
            stateType: 'update_proyecto',
            reset: reset,
            data: data
        },  
        get_proyectos: {
            path: `proyectos/search/${search}/tipo/${id_tipo}`,
            stateType: 'get_proyectos',
            reset: reset
        },   
        get_tipo_proyectos_negocios: {
            path: `tipo_proyectos/clientes`,
            stateType: 'get_tipo_proyectos_negocios',
            reset: reset
        },
        get_proyectos_todo: {
            path: `proyectos/tipo_proyectos/clientes`,
            stateType: 'get_proyectos_todo',
            reset: reset
        }, 
        get_proyecto: {
            path: `proyecto/${id}`,
            stateType: 'get_proyecto',
            reset: reset
        },
        delete_proyecto: {
            path: `delete/proyecto/${id}`,
            stateType: 'delete_proyecto',
            reset: reset
        }
    }
}