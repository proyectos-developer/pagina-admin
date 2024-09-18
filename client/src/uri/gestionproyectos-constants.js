import { constantes } from "./constantes"

export const gestionproyectosConstants = (id = 1, search = '', columna = '', valor = '', fecha = '', order_by = '', order = '', begin = '', amount = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_informe_proyecto: {
            path: `gestion/informacion/proyecto`,
            stateType: 'new_informe_proyecto',
            reset: reset,
            data: data
        }, 
        update_informe_proyecto: {
            path: `gestion/informacion/proyecto/${id}`,
            stateType: 'update_informe_proyecto',
            reset: reset,
            data: data
        },  
        get_informes_proyectos_filter: {
            path: `gestion/informacion/proyectos/search/${search}/fecha/${fecha}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_informes_proyectos_filter',
            reset: reset
        },   
        get_informe_proyecto: {
            path: `gestion/proyecto/${id}`,
            stateType: 'get_informe_proyecto',
            reset: reset
        },
        delete_informe_proyecto: {
            path: `gestion/delete/proyecto/${id}`,
            stateType: 'delete_informe_proyecto',
            reset: reset
        },

        new_trabajador_proyecto: {
            path: `gestion/trabajador/proyecto`,
            stateType: 'new_trabajador_proyecto',
            reset: reset,
            data: data
        }, 
        update_trabajador_proyecto: {
            path: `gestion/trabajador/proyecto/${search}/${id}`,
            stateType: 'update_trabajador_proyecto',
            reset: reset,
            data: data
        },  
        get_trabajadores_proyecto_filter: {
            path: `gestion/trabajadores/proyecto/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_trabajadores_proyecto_filter',
            reset: reset
        },   
        get_trabajador_proyecto: {
            path: `gestion/trabajador/proyecto/${id}`,
            stateType: 'get_trabajador_proyecto',
            reset: reset
        },  
        get_datos_trabajador_proyecto: {
            path: `gestion/datos/trabajador/proyecto/${id}`,
            stateType: 'get_datos_trabajador_proyecto',
            reset: reset
        },
        delete_equipo_proyecto: {
            path: `gestion/delete/trabajador/proyecto/${id}`,
            stateType: 'delete_equipo_proyecto',
            reset: reset
        },

        new_actividad_proyecto: {
            path: `gestion/actividad/proyecto`,
            stateType: 'new_actividad_proyecto',
            reset: reset,
            data: data
        }, 
        update_actividad_proyecto: {
            path: `gestion/actividad/proyecto/${id}`,
            stateType: 'update_actividad_proyecto',
            reset: reset,
            data: data
        },  
        get_actividades_proyecto_filter: {
            path: `gestion/actividades/proyecto/search/${search}/fecha/${fecha}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_actividades_proyecto_filter',
            reset: reset
        },   
        get_actividad_proyecto: {
            path: `gestion/actividad/proyecto/${id}`,
            stateType: 'get_actividad_proyecto',
            reset: reset
        },
        delete_actividad_proyecto: {
            path: `gestion/delete/actividad/proyecto/${id}`,
            stateType: 'delete_actividad_proyecto',
            reset: reset
        },

        new_documento_proyecto: {
            path: `gestion/documento/proyecto`,
            stateType: 'new_documento_proyecto',
            reset: reset,
            data: data
        }, 
        update_documento_proyecto: {
            path: `gestion/documentos/proyecto/${id}`,
            stateType: 'update_documento_proyecto',
            reset: reset,
            data: data
        },  
        get_documentos_proyecto_filter: {
            path: `gestion/documentos/proyecto/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_documentos_proyecto_filter',
            reset: reset
        },   
        get_documento_proyecto: {
            path: `gestion/documento/proyecto/${id}`,
            stateType: 'get_documento_proyecto',
            reset: reset
        },
        delete_documento_proyecto: {
            path: `gestion/delete/documento/proyecto/${id}`,
            stateType: 'delete_documento_proyecto',
            reset: reset
        },

        new_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto`,
            stateType: 'new_comunicacion_proyecto',
            reset: reset,
            data: data
        }, 
        update_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto/${id}`,
            stateType: 'update_comunicacion_proyecto',
            reset: reset,
            data: data
        },  
        get_comunicaciones_proyecto_filter: {
            path: `gestion/comunicaciones/proyecto/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_comunicaciones_proyecto_filter',
            reset: reset
        },   
        get_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto/${id}`,
            stateType: 'get_comunicacion_proyecto',
            reset: reset
        },
        delete_comunicacion_proyecto: {
            path: `gestion/delete/comunicacion/proyecto/${id}`,
            stateType: 'delete_comunicacion_proyecto',
            reset: reset
        },

        new_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto`,
            stateType: 'new_riesgo_proyecto',
            reset: reset,
            data: data
        }, 
        update_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto/${id}`,
            stateType: 'update_riesgo_proyecto',
            reset: reset,
            data: data
        },  
        get_riesgos_proyecto_filter: {
            path: `gestion/riesgos/proyecto/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_riesgos_proyecto_filter',
            reset: reset
        },   
        get_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto/${id}`,
            stateType: 'get_riesgo_proyecto',
            reset: reset
        },
        delete_riesgo_proyecto: {
            path: `gestion/delete/riesgo/proyecto/${id}`,
            stateType: 'delete_riesgo_proyecto',
            reset: reset
        },

        new_kpi_proyecto: {
            path: `gestion/kpi/proyecto`,
            stateType: 'new_kpi_proyecto',
            reset: reset,
            data: data
        }, 
        update_kpi_proyecto: {
            path: `gestion/kpi/proyecto/${id}`,
            stateType: 'update_kpi_proyecto',
            reset: reset,
            data: data
        },  
        get_kpis_proyecto_filter: {
            path: `gestion/kpis/proyecto/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_kpis_proyecto_filter',
            reset: reset
        },   
        get_kpi_proyecto: {
            path: `gestion/kpi/proyecto/${id}`,
            stateType: 'get_kpi_proyecto',
            reset: reset
        },
        delete_kpi_proyecto: {
            path: `gestion/delete/kpi/proyecto/${id}`,
            stateType: 'delete_kpi_proyecto',
            reset: reset
        }
    }
}