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
        update_personal_personal: {
            path: `personal/data/personal/${id}`,
            stateType: 'update_personal_personal',
            reset: reset,
            data: data
        },  
        update_personal_comunicacion: {
            path: `personal/data/comunicacion/${id}`,
            stateType: 'update_personal_comunicacion',
            reset: reset,
            data: data
        }, 
        update_personal_estudios: {
            path: `personal/data/estudios/${id}`,
            stateType: 'update_personal_estudios',
            reset: reset,
            data: data
        }, 
        update_personal_trabajo: {
            path: `personal/data/trabajo/${id}`,
            stateType: 'update_personal_trabajo',
            reset: reset,
            data: data
        }, 
        update_personal_sueldo: {
            path: `personal/data/sueldo/${id}`,
            stateType: 'update_personal_sueldo',
            reset: reset,
            data: data
        }, 
        update_personal_evaluacion: {
            path: `personal/data/evaluacion/${id}`,
            stateType: 'update_personal_evaluacion',
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
        get_personal_personal: {
            path: `personal/data/personal/${id}`,
            stateType: 'get_personal_personal',
            reset: reset
        },  
        get_personal_comunicacion: {
            path: `personal/data/comunicacion/${id}`,
            stateType: 'get_personal_comunicacion',
            reset: reset
        }, 
        get_personal_estudios: {
            path: `personal/data/estudios/${id}`,
            stateType: 'get_personal_estudios',
            reset: reset
        }, 
        get_personal_trabajo: {
            path: `personal/data/trabajo/${id}`,
            stateType: 'get_personal_trabajo',
            reset: reset
        }, 
        get_personal_sueldo: {
            path: `personal/data/sueldo/${id}`,
            stateType: 'get_personal_sueldo',
            reset: reset
        }, 
        get_personal_evaluacion: {
            path: `personal/data/evaluacion/${id}`,
            stateType: 'get_personal_evaluacion',
            reset: reset
        }, 
        delete_personal: {
            path: `delete/personal/${id}`,
            stateType: 'delete_personal',
            reset: reset
        },

        get_cumpleanios_hoy:{
            path: `cumpleanios/${id}`,
            stateType: 'get_cumpleanios_hoy',
            reset: reset
        },
        get_cumpleanios_filter:{
            path: `cumpleanios/${begin}/${amount}`,
            stateType: 'get_cumpleanios_filter',
            reset: reset
        },
        
        new_estado: {
            path: `estado_trabajo`,
            stateType: 'new_estado',
            reset: reset,
            data: data
        }, 
        update_estado: {
            path: `estado_trabajo/${id}`,
            stateType: 'update_estado',
            reset: reset,
            data: data
        },
        update_estado_trabajador: {
            path: `estado_trabajo/data/trabajador/${id}`,
            stateType: 'update_estado_trabajador',
            reset: reset,
            data: data
        },
        update_estado_reemplazo: {
            path: `estado_trabajo/data/reemplazo/${id}`,
            stateType: 'update_estado_reemplazo',
            reset: reset,
            data: data
        },  
        get_estados_filter:{
            path: `estados_trabajo/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_estados_filter',
            reset: reset
        },
        get_estado:{
            path: `estado_trabajo/${id}`,
            stateType: 'get_estado',
            reset: reset
        },
        get_estado_trabajador:{
            path: `estado_trabajo/data/trabajador/${id}`,
            stateType: 'get_estado_trabajador',
            reset: reset
        },
        get_estado_reemplazo:{
            path: `estado_trabajo/data/reemplazo/${id}`,
            stateType: 'get_estado_reemplazo',
            reset: reset
        },
        delete_estado:{
            path: `delete/estado_trabajo/${id}`,
            stateType: 'delete_estado',
            reset: reset
        },
    }
}