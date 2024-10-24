import { constantes } from "./constantes"

export const proveedoresConstants = (id = 1, search = '', order_by = '', order = '', begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_proveedor: {
            path: `proveedor`,
            stateType: 'new_proveedor',
            reset: reset,
            data: data
        }, 
        update_proveedor_general: {
            path: `proveedor/general/${id}`,
            stateType: 'update_proveedor_general',
            reset: reset,
            data: data
        },  
        update_proveedor_comercial: {
            path: `proveedor/comercial/${id}`,
            stateType: 'update_proveedor_comercial',
            reset: reset,
            data: data
        },  
        update_proveedor_financiera: {
            path: `proveedor/financiera/${id}`,
            stateType: 'update_proveedor_financiera',
            reset: reset,
            data: data
        },  
        update_proveedor_evaluacion: {
            path: `proveedor/evaluacion/${id}`,
            stateType: 'update_proveedor_evaluacion',
            reset: reset,
            data: data
        },  
        update_proveedor_adicional: {
            path: `proveedor/adicional/${id}`,
            stateType: 'update_proveedor_adicional',
            reset: reset,
            data: data
        },  
        get_proveedores_filter: {
            path: `proveedores/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_proveedores_filter',
            reset: reset
        },
        get_proveedor_general: {
            path: `proveedor/general/${id}`,
            stateType: 'get_proveedor_general',
            reset: reset
        },  
        get_proveedor_comercial: {
            path: `proveedor/comercial/${id}`,
            stateType: 'get_proveedor_comercial',
            reset: reset
        },  
        get_proveedor_financiera: {
            path: `proveedor/financiera/${id}`,
            stateType: 'get_proveedor_financiera',
            reset: reset
        },  
        get_proveedor_evaluacion: {
            path: `proveedor/evaluacion/${id}`,
            stateType: 'get_proveedor_evaluacion',
            reset: reset
        },  
        get_proveedor_adicional: {
            path: `proveedor/adicional/${id}`,
            stateType: 'get_proveedor_adicional',
            reset: reset
        }, 
        delete_proveedor: {
            path: `delete/proveedor/${id}`,
            stateType: 'delete_proveedor',
            reset: reset
        }
    }
}