import { constantes } from "./constantes"

export const gestionproyectosConstants = (id = 1, search = '', columna = '', valor = '', fecha = '', order_by = '', order = '', begin = '', amount = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_gestion_proyecto: {
            path: `gestion/proyecto`,
            stateType: 'new_gestion_proyecto',
            reset: reset,
            data: data
        }, 
        new_equipo_proyecto: {
            path: `gestion/equipo/proyecto`,
            stateType: 'new_equipo_proyecto',
            reset: reset,
            data: data
        }, 
        new_tarea_proyecto: {
            path: `gestion/tarea/proyecto`,
            stateType: 'new_tarea_proyecto',
            reset: reset,
            data: data
        },
        new_documento_proyecto: {
            path: `gestion/documento/proyecto`,
            stateType: 'new_documento_proyecto',
            reset: reset,
            data: data
        },
        new_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto`,
            stateType: 'new_comunicacion_proyecto',
            reset: reset,
            data: data
        },
        new_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto`,
            stateType: 'new_riesgo_proyecto',
            reset: reset,
            data: data
        },
        new_kpi_proyecto: {
            path: `gestion/kpi/proyecto`,
            stateType: 'new_kpi_proyecto',
            reset: reset,
            data: data
        }, 

        update_gestion_proyecto: {
            path: `gestion/proyecto/${id}`,
            stateType: 'update_gestion_proyecto',
            reset: reset,
            data: data
        },
        update_equipo_proyecto: {
            path: `gestion/equipo/proyecto/${search}/${id}`,
            stateType: 'update_equipo_proyecto',
            reset: reset,
            data: data
        },  
        update_tarea_proyecto: {
            path: `gestion/tarea/proyecto/${id}`,
            stateType: 'update_tarea_proyecto',
            reset: reset,
            data: data
        }, 
        update_documento_proyecto: {
            path: `gestion/documento/proyecto/${id}`,
            stateType: 'update_documento_proyecto',
            reset: reset,
            data: data
        },
        update_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto/${id}`,
            stateType: 'update_comunicacion_proyecto',
            reset: reset,
            data: data
        },  
        update_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto/${id}`,
            stateType: 'update_riesgo_proyecto',
            reset: reset,
            data: data
        },  
        update_kpi_proyecto: {
            path: `gestion/kpi/proyecto/${id}`,
            stateType: 'update_kpi_proyecto',
            reset: reset,
            data: data
        },  

        get_gestion_proyectos_filter: {
            path: `gestion/proyectos/search/${search}/fecha/${fecha}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_gestion_proyectos_filter',
            reset: reset
        },  
        get_equipos_proyectos_filter: {
            path: `gestion/equipos/proyectos/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_equipos_proyectos_filter',
            reset: reset
        },
        get_tareas_proyectos_filter: {
            path: `gestion/tareas/proyectos/search/${search}/fecha/${fecha}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_tareas_proyectos_filter',
            reset: reset
        },
        get_documentos_proyectos_filter: {
            path: `gestion/documentos/proyectos/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_documentos_proyectos_filter',
            reset: reset
        },   
        get_carpetas_documentos_proyecto:{
            path: `gestion/documentos/carpetas/proyecto/${id}`,
            stateType: 'get_carpetas_documentos_proyecto',
            reset: reset
        },
        get_comunicaciones_proyectos_filter: {
            path: `gestion/comunicaciones/proyectos/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_comunicaciones_proyectos_filter',
            reset: reset
        },   
        get_riesgos_proyectos_filter: {
            path: `gestion/riesgos/proyectos/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_riesgos_proyectos_filter',
            reset: reset
        },
        get_kpis_proyectos_filter: {
            path: `gestion/kpis/proyectos/search/${search}/columna/${columna}/${valor}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_kpis_proyectos_filter',
            reset: reset
        },       
         
        get_gestion_proyecto: {
            path: `gestion/proyecto/${id}`,
            stateType: 'get_gestion_proyecto',
            reset: reset
        },
        get_equipo_proyecto: {
            path: `gestion/equipo/proyecto/${id}`,
            stateType: 'get_equipo_proyecto',
            reset: reset
        },  
        get_trabajador_equipo_proyecto: {
            path: `gestion/trabajador/equipo/proyecto/${id}/${search}`,
            stateType: 'get_trabajador_equipo_proyecto',
            reset: reset
        },  
        get_datos_equipo_proyecto: {
            path: `gestion/datos/equipo/proyecto/${id}`,
            stateType: 'get_datos_equipo_proyecto',
            reset: reset
        },
        get_tarea_proyecto: {
            path: `gestion/tarea/proyecto/${id}`,
            stateType: 'get_tarea_proyecto',
            reset: reset
        },
        get_documento_proyecto: {
            path: `gestion/documento/proyecto/${id}`,
            stateType: 'get_documento_proyecto',
            reset: reset
        },        
        get_comunicacion_proyecto: {
            path: `gestion/comunicacion/proyecto/${id}`,
            stateType: 'get_comunicacion_proyecto',
            reset: reset
        },
        get_riesgo_proyecto: {
            path: `gestion/riesgo/proyecto/${id}`,
            stateType: 'get_riesgo_proyecto',
            reset: reset
        },   
        get_kpi_proyecto: {
            path: `gestion/kpi/proyecto/${id}`,
            stateType: 'get_kpi_proyecto',
            reset: reset
        },

        delete_gestion_proyecto: {
            path: `delete/gestion/proyecto/${id}`,
            stateType: 'delete_gestion_proyecto',
            reset: reset
        }
    }
}