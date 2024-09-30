import { constantes } from "./constantes"

export const filesConstants = (carpeta = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        file_upload: {
            path: `upload/foto/${carpeta}`,
            stateType: 'file_upload',
            reset: reset,
            data: data
        },
        file_upload_foto_perfil: {
            path: `upload/archivo/personal/foto_perfil/${carpeta}`,
            stateType: 'file_upload_foto_perfil',
            reset: reset,
            data: data
        },
        file_upload_documento: {
            path: `upload/archivo/personal/documentos/${carpeta}`,
            stateType: 'file_upload_documento',
            reset: reset,
            data: data
        },
        file_upload_cuarta_categoria: {
            path: `upload/archivo/personal/cuarta_categoria/${carpeta}`,
            stateType: 'file_upload_cuarta_categoria',
            reset: reset,
            data: data
        },
        file_upload_evaluacion: {
            path: `upload/archivo/personal/evaluacion/${carpeta}`,
            stateType: 'file_upload_evaluacion',
            reset: reset,
            data: data
        }
    }
}