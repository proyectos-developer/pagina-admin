import { constantes } from "./constantes"

export const filesConstants = (carpeta = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        file_upload: {
            path: `upload/foto/${carpeta}`,
            stateType: 'file_upload',
            reset: reset,
            data: data
        }
    }
}