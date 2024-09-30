import { constantes } from "./constantes"

export const institutosConstants = (id = 1, search = 0, departamento = 0, region = 0, provincia = 0, distrito = 0, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        get_colegios_filter: {
            path: `colegios/search/${search}/region/${region}/provincia/${provincia}/distrito/${distrito}`,
            stateType: 'get_colegios_filter',
            reset: reset
        },   
        get_universidades_filter: {
            path: `universidades/search/${search}/provincia/${provincia}/departamento/${departamento}`,
            stateType: 'get_universidades_filter',
            reset: reset
        }
    }
}