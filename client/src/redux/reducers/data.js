import {datatypes, set_datos_paso_gestion_proyectos} from '../actions/data.js'

const initial_state = {
    authenticated: false,
    open_menu_lateral: false,
    opcion_menu_lateral: {},
    data_editable: false,
    confirmacion_eliminacion: {show: false, confirmacion: false, mensaje: '', id: 0},
    error_message: false,
    
    data_negocio: {},
    data_tipo_proyecto: {},
    data_proyecto: {},
    data_cliente: {},
    data_productos: {},
    data_favoritos: {},
    data_calificaciones: {},
    data_compras: [],
    data_suscriptores: {},
    data_noticia: {},
    data_categoria_noticia: {},
    data_categoria: {},
    data_subcategoria: {},
    data_servicio: {},
    data_unidad: {},
    data_departamento: {},
    data_personal: {},
    data_personal_personal: {},
    data_personal_ubicacion: {},
    data_personal_estudios: {},
    data_personal_trabajo: {},
    data_personal_sueldo: {},
    data_personal_evaluacion: {},
    data_administradores: {},
    data_notificaciones: {},
    data_mensajes: {},
    data_reuniones: {},
    data_gestion_proyectos: {},
    data_nomina: {},
    data_facturacion: {},
    datos_paso_personal: 'personal',
    datos_paso_factura: 'cliente',
    datos_paso_estado: 'trabajador',
    datos_paso_gestion_proyectos: 'gestion',
    datos_paso_proveedor: 'general',
    datos_paso_producto: 'detalles',
    data_facturacion_cliente: {},
    data_facturacion_fiscal: {},
    data_facturacion_productos: {},
    data_facturacion_factura: {},
    data_estado_trabajo: {},
    data_estado_trabajador: {},
    data_estado_reemplazo: {},
    data_asistencia: {},
    data_gestion_informacion: {},
    data_gestion_tareas: {},
    data_gestion_equipo: {},
    data_gestion_documentos: {},
    data_gestion_comunicaciones: {},
    data_gestion_riesgos: {},
    data_gestion_kpis: {},
    data_proveedor: {},
    data_proveedor_general: {},
    data_proveedor_comercial: {},
    data_proveedor_financiera: {},
    data_proveedor_evaluacion: {},
    data_proveedor_adicional: {},
    data_marca: {},
    data_producto_detalles: {},
    data_producto_precios: {},
    data_producto_caracteristicas: {},
    data_producto_fotos: {},
}

const data = (state = initial_state, action) => {
    if (action.type === datatypes.SET_AUTHENTICATED){
        const authenticated = action.authenticated
        return {
            ... state,
            authenticated
        }
    }else if (action.type === datatypes.SET_OPEN_MENU_LATERAL){
        const open_menu_lateral = action.open_menu_lateral
        return {
            ... state,
            open_menu_lateral
        }
    }else if (action.type === datatypes.SET_OPCION_MENU_LATERAL){
        const opcion_menu_lateral = action.opcion_menu_lateral
        return {
            ... state,
            opcion_menu_lateral
        }
    }else if (action.type === datatypes.SET_DATA_NEGOCIO){
        const data_negocio = action.data_negocio
        return {
            ... state,
            data_negocio
        }
    }else if (action.type === datatypes.SET_DATA_TIPO_PROYECTO){
        const data_tipo_proyecto = action.data_tipo_proyecto
        return {
            ... state,
            data_tipo_proyecto
        }
    }else if (action.type === datatypes.SET_DATA_PROYECTO){
        const data_proyecto = action.data_proyecto
        return {
            ... state,
            data_proyecto
        }
    }else if (action.type === datatypes.SET_DATA_CLIENTE){
        const data_cliente = action.data_cliente
        return {
            ... state,
            data_cliente
        }
    }else if (action.type === datatypes.SET_DATA_PRODUCTOS){
        const data_productos = action.data_productos
        return {
            ... state,
            data_productos
        }
    }else if (action.type === datatypes.SET_DATA_FAVORITOS){
        const data_favoritos = action.data_favoritos
        return {
            ... state,
            data_favoritos
        }
    }else if (action.type === datatypes.SET_DATA_CALIFICACIONES){
        const data_calificaciones = action.data_calificaciones
        return {
            ... state,
            data_calificaciones
        }
    }else if (action.type === datatypes.SET_DATA_COMPRAS){
        const data_compras = action.data_compras
        return {
            ... state,
            data_compras
        }
    }else if (action.type === datatypes.SET_DATA_SUSCRIPTORES){
        const data_suscriptores = action.data_suscriptores
        return {
            ... state,
            data_suscriptores
        }
    }else if (action.type === datatypes.SET_DATA_NOTICIA){
        const data_noticia = action.data_noticia
        return {
            ... state,
            data_noticia
        }
    }else if (action.type === datatypes.SET_DATA_CATEGORIA){
        const data_categoria = action.data_categoria
        return {
            ... state,
            data_categoria
        }
    }else if (action.type === datatypes.SET_DATA_CATEGORIA_NOTICIA){
        const data_categoria_noticia = action.data_categoria_noticia
        return {
            ... state,
            data_categoria_noticia
        }
    }else if (action.type === datatypes.SET_DATA_SUBCATEGORIA){
        const data_subcategoria = action.data_subcategoria
        return {
            ... state,
            data_subcategoria
        }
    }else if (action.type === datatypes.SET_DATA_SERVICIO){
        const data_servicio = action.data_servicio
        return {
            ... state,
            data_servicio
        }
    }else if (action.type === datatypes.SET_DATA_UNIDAD){
        const data_unidad = action.data_unidad
        return {
            ... state,
            data_unidad
        }
    }else if (action.type === datatypes.SET_DATA_DEPARTAMENTO){
        const data_departamento = action.data_departamento
        return {
            ... state,
            data_departamento
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL){
        const data_personal = action.data_personal
        return {
            ... state,
            data_personal
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_PERSONAL){
        const data_personal_personal = action.data_personal_personal
        return {
            ... state,
            data_personal_personal
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_UBICACION){
        const data_personal_ubicacion = action.data_personal_ubicacion
        return {
            ... state,
            data_personal_ubicacion
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_ESTUDIOS){
        const data_personal_estudios = action.data_personal_estudios
        return {
            ... state,
            data_personal_estudios
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_TRABAJO){
        const data_personal_trabajo = action.data_personal_trabajo
        return {
            ... state,
            data_personal_trabajo
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_SUELDO){
        const data_personal_sueldo = action.data_personal_sueldo
        return {
            ... state,
            data_personal_sueldo
        }
    }else if (action.type === datatypes.SET_DATA_PERSONAL_EVALUACION){
        const data_personal_evaluacion = action.data_personal_evaluacion
        return {
            ... state,
            data_personal_evaluacion
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_PERSONAL){
        const datos_paso_personal = action.datos_paso_personal
        return {
            ... state,
            datos_paso_personal
        }
    }else if (action.type === datatypes.SET_DATA_FACTURACION_CLIENTE){
        const data_facturacion_cliente = action.data_facturacion_cliente
        return {
            ... state,
            data_facturacion_cliente
        }
    }else if (action.type === datatypes.SET_DATA_FACTURACION_FISCAL){
        const data_facturacion_fiscal = action.data_facturacion_fiscal
        return {
            ... state,
            data_facturacion_fiscal
        }
    }else if (action.type === datatypes.SET_DATA_FACTURACION_PRODUCTOS){
        const data_facturacion_productos = action.data_facturacion_productos
        return {
            ... state,
            data_facturacion_productos
        }
    }else if (action.type === datatypes.SET_DATA_FACTURACION_FACTURA){
        const data_facturacion_factura = action.data_facturacion_factura
        return {
            ... state,
            data_facturacion_factura
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_FACTURA){
        const datos_paso_factura = action.datos_paso_factura
        return {
            ... state,
            datos_paso_factura
        }
    }else if (action.type === datatypes.SET_DATA_ADMINISTRADORES){
        const data_administradores = action.data_administradores
        return {
            ... state,
            data_administradores
        }
    }else if (action.type === datatypes.SET_DATA_NOTIFICACIONES){
        const data_notificaciones = action.data_notificaciones
        return {
            ... state,
            data_notificaciones
        }
    }else if (action.type === datatypes.SET_DATA_MENSAJES){
        const data_mensajes = action.data_mensajes
        return {
            ... state,
            data_mensajes
        }
    }else if (action.type === datatypes.SET_DATA_REUNIONES){
        const data_reuniones = action.data_reuniones
        return {
            ... state,
            data_reuniones
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_PROYECTOS){
        const data_gestion_proyectos = action.data_gestion_proyectos
        return {
            ... state,
            data_gestion_proyectos
        }
    }else if (action.type === datatypes.SET_DATA_NOMINAS){
        const data_nomina = action.data_nomina
        return {
            ... state,
            data_nomina
        }
    }else if (action.type === datatypes.SET_DATA_FACTURACION){
        const data_facturacion = action.data_facturacion
        return {
            ... state,
            data_facturacion
        }
    }else if (action.type === datatypes.SET_DATA_EDITABLE){
        const data_editable = action.data_editable
        return {
            ... state,
            data_editable
        }
    }else if (action.type === datatypes.SET_CONFIRMACION_ELIMINACION){
        const confirmacion_eliminacion = action.confirmacion_eliminacion
        return {
            ... state,
            confirmacion_eliminacion
        }
    }else if (action.type === datatypes.SET_ERROR_MESSAGE){
        const error_message = action.error_message
        return {
            ... state,
            error_message
        }
    }else if (action.type === datatypes.SET_DATA_ESTADO_TRABAJO){
        const data_estado_trabajo = action.data_estado_trabajo
        return {
            ... state,
            data_estado_trabajo
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_ESTADO){
        const datos_paso_estado = action.datos_paso_estado
        return {
            ... state,
            datos_paso_estado
        }
    }else if (action.type === datatypes.SET_DATA_ESTADO_TRABAJADOR){
        const data_estado_trabajador = action.data_estado_trabajador
        return {
            ... state,
            data_estado_trabajador
        }
    }else if (action.type === datatypes.SET_DATA_ESTADO_REEMPLAZO){
        const data_estado_reemplazo = action.data_estado_reemplazo
        return {
            ... state,
            data_estado_reemplazo
        }
    }else if (action.type === datatypes.SET_DATA_ASISTENCI){
        const data_asistencia = action.data_asistencia
        return {
            ... state,
            data_asistencia
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_GESTION_PROYECTOS){
        const datos_paso_gestion_proyectos = action.datos_paso_gestion_proyectos
        return {
            ... state,
            datos_paso_gestion_proyectos
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_INFORMACION){
        const data_gestion_informacion = action.data_gestion_informacion
        return {
            ... state,
            data_gestion_informacion
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_TAREAS){
        const data_gestion_tareas = action.data_gestion_tareas
        return {
            ... state,
            data_gestion_tareas
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_EQUIPO){
        const data_gestion_equipo = action.data_gestion_equipo
        return {
            ... state,
            data_gestion_equipo
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_DOCUMENTOS){
        const data_gestion_documentos = action.data_gestion_documentos
        return {
            ... state,
            data_gestion_documentos
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_COMUNICACIONES){
        const data_gestion_comunicaciones = action.data_gestion_comunicaciones
        return {
            ... state,
            data_gestion_comunicaciones
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_RIESGOS){
        const data_gestion_riesgos = action.data_gestion_riesgos
        return {
            ... state,
            data_gestion_riesgos
        }
    }else if (action.type === datatypes.SET_DATA_GESTION_KPIS){
        const data_gestion_kpis = action.data_gestion_kpis
        return {
            ... state,
            data_gestion_kpis
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR){
        const data_proveedor = action.data_proveedor
        return {
            ... state,
            data_proveedor
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_PROVEEDOR){
        const datos_paso_proveedor = action.datos_paso_proveedor
        return {
            ... state,
            datos_paso_proveedor
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR_GENERAL){
        const data_proveedor_general = action.data_proveedor_general
        return {
            ... state,
            data_proveedor_general
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR_COMERCIAL){
        const data_proveedor_comercial = action.data_proveedor_comercial
        return {
            ... state,
            data_proveedor_comercial
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR_FINANCIERA){
        const data_proveedor_financiera = action.data_proveedor_financiera
        return {
            ... state,
            data_proveedor_financiera
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR_EVALUACION){
        const data_proveedor_evaluacion = action.data_proveedor_evaluacion
        return {
            ... state,
            data_proveedor_evaluacion
        }
    }else if (action.type === datatypes.SET_DATA_PROVEEDOR_ADICIONAL){
        const data_proveedor_adicional = action.data_proveedor_adicional
        return {
            ... state,
            data_proveedor_adicional
        }
    }else if (action.type === datatypes.SET_DATA_MARCA){
        const data_marca = action.data_marca
        return {
            ... state,
            data_marca
        }
    }else if (action.type === datatypes.SET_DATOS_PASO_PRODUCTO){
        const datos_paso_producto = action.datos_paso_producto
        return {
            ... state,
            datos_paso_producto
        }
    }else if (action.type === datatypes.SET_DATA_PRODUCTO_DETALLES){
        const data_producto_detalles = action.data_producto_detalles
        return {
            ... state,
            data_producto_detalles
        }
    }else if (action.type === datatypes.SET_DATA_PRODUCTO_PRECIOS){
        const data_producto_precios = action.data_producto_precios
        return {
            ... state,
            data_producto_precios
        }
    }else if (action.type === datatypes.SET_DATA_PRODUCTO_CARACTERISTICAS){
        const data_producto_caracteristicas = action.data_producto_caracteristicas
        return {
            ... state,
            data_producto_caracteristicas
        }
    }else if (action.type === datatypes.SET_DATA_PRODUCTO_FOTOS){
        const data_producto_fotos = action.data_producto_fotos
        return {
            ... state,
            data_producto_fotos
        }
    }else{
        return state
    }
}

export default data