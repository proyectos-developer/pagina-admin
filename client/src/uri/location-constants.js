import { constantes } from "./constantes"

export const locationConstants = (id = 1, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        get_location_paises: {
            path: `location/paises`,
            stateType: 'get_location_paises',
            reset: reset
        }, 
        get_location_provincias: {
            path: `location/provincias/${id}`,
            stateType: 'get_location_provincias',
            reset: reset
        }, 
        get_location_distritos: {
            path: `location/distritos/${id}`,
            stateType: 'get_location_distritos',
            reset: reset
        }
    }
}