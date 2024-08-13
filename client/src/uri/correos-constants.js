import { constantes } from "./constantes"

export const correosConstants = (id = 1, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        local_correo_cambio_password: {
            path: `correo/local/nuevo/password`,
            stateType: 'local_correo_cambio_password',
            reset: reset,
            data: data
        }
    }
}