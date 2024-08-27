import { constantes } from "./constantes"

export const areasempresaConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_area_empresa: {
            path: `area_empresa`,
            stateType: 'new_area_empresa',
            reset: reset,
            data: data
        }, 
        update_area_empresa: {
            path: `area_empresa/${id}`,
            stateType: 'update_area_empresa',
            reset: reset,
            data: data
        },  
        get_areas_empresa_filter: {
            path: `areas_empresa/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_areas_empresa_filter',
            reset: reset
        },   
        get_area_empresa: {
            path: `area_empresa/${id}`,
            stateType: 'get_area_empresa',
            reset: reset
        },
        delete_area_empresa: {
            path: `delete/area_empresa/${id}`,
            stateType: 'delete_area_empresa',
            reset: reset
        }
    }
}