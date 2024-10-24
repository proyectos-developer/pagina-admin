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
        },
        file_upload_estado_trabajo: {
            path: `upload/archivo/personal/estadotrabajo/${carpeta}`,
            stateType: 'file_upload_estado_trabajo',
            reset: reset,
            data: data
        },
        file_upload_logo_proveedor: {
            path: `upload/archivo/proveedor/logo/${carpeta}`,
            stateType: 'file_upload_logo_proveedor',
            reset: reset,
            data: data
        },
        file_upload_logo_marca: {
            path: `upload/archivo/marca/logo/${carpeta}`,
            stateType: 'file_upload_logo_marca',
            reset: reset,
            data: data
        },
        file_upload_fotos_productos: {
            path: `upload/archivo/productos/fotos/${carpeta}`,
            stateType: 'file_upload_fotos_productos',
            reset: reset,
            data: data
        }
    }
}