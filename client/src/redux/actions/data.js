export const datatypes = {
    SET_AUTHENTICATED: 'SET_AUTENTICATED',
    SET_OPEN_MENU_LATERAL: 'SET_OPEN_MENU_LATERAL',
    SET_OPCION_MENU_LATERAL: 'SET_OPCION_MENU_LATERAL',
    SET_DATA_EDITABLE: 'SET_DATA_EDITABLE',
    SET_CONFIRMACION_ELIMINACION: 'SET_CONFIRMACION_ELIMINACION',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',

    SET_DATA_NEGOCIO: 'SET_DATA_NEGOCIO',
    SET_DATA_TIPO_PROYECTO: 'SET_DATA_TIPO_PROYECTO',
    SET_DATA_PROYECTO: 'SET_DATA_PROYECTO',
    SET_DATA_CLIENTE: 'SET_DATA_CLIENTE',
    SET_DATA_PRODUCTOS: 'SET_DATA_PRODUCTOS',
    SET_DATA_FAVORITOS: 'SET_DATA_FAVORITOS',
    SET_DATA_CALIFICACIONES: 'SET_DATA_CALIFICACIONES',
    SET_DATA_COMPRAS: 'SET_DATA_COMPRAS',
    SET_DATA_SUSCRIPTORES: 'SET_DATA_SUSCRIPTORES',
    SET_DATA_NOTICIA: 'SET_DATA_NOTICIA',
    SET_DATA_CATEGORIA: 'SET_DATA_CATEGORIA',
    SET_DATA_CATEGORIA_NOTICIA: 'SET_DATA_CATEGORIA_NOTICIA',
    SET_DATA_SUBCATEGORIA: 'SET_DATA_SUBCATEGORIA',
    SET_DATA_SERVICIO: 'SET_DATA_SERVICIO',
    SET_DATA_UNIDAD: 'SET_DATA_UNIDAD',
    SET_DATA_PERSONAL: 'SET_DATA_PERSONAL',
    SET_DATA_PERSONAL_PERSONAL: 'SET_DATA_PERSONAL_PERSONAL',
    SET_DATA_PERSONAL_UBICACION: 'SET_DATA_PERSONAL_UBICACION',
    SET_DATA_PERSONAL_ESTUDIOS: 'SET_DATA_PERSONAL_ESTUDIOS',
    SET_DATA_PERSONAL_TRABAJO: 'SET_DATA_PERSONAL_TRABAJO',
    SET_DATA_PERSONAL_SUELDO: 'SET_DATA_PERSONAL_SUELDO',
    SET_DATA_PERSONAL_EVALUACION: 'SET_DATA_PERSONAL_EVALUACION',
    SET_DATA_ADMINISTRADORES: 'SET_DATA_ADMINISTRADORES',
    SET_DATA_DEPARTAMENTO: 'SET_DATA_DEPARTAMENTO',
    SET_DATA_NOTIFICACIONES: 'SET_DATA_NOTIFICACIONES',
    SET_DATA_MENSAJES: 'SET_DATA_MENSAJES',
    SET_DATA_REUNIONES: 'SET_DATA_REUNIONES',
    SET_DATA_GESTION_PROYECTOS: 'SET_DATA_GESTION_PROYECTOS',
    SET_DATA_NOMINAS: 'SET_DATA_NOMINAS',
    SET_DATA_FACTURACION: 'SET_DATA_FACTURACION',
    SET_DATA_FACTURACION_CLIENTE: 'SET_DATA_FACTURACION_CLIENTE',
    SET_DATA_FACTURACION_FISCAL: 'SET_DATA_FACTURACION_FISCAL',
    SET_DATA_FACTURACION_PRODUCTOS: 'SET_DATA_FACTURACION_PRODUCTOS',
    SET_DATA_FACTURACION_FACTURA: 'SET_DATA_FACTURACION_FACTURA',
    SET_DATA_ESTADO_TRABAJO: 'SET_DATA_ESTADO_TRABAJO',
    SET_DATA_ESTADO_TRABAJADOR: 'SET_DATA_ESTADO_TRABAJADOR',
    SET_DATA_ESTADO_REEMPLAZO: 'SET_DATA_ESTADO_REEMPLAZO',
    SET_DATA_ASISTENCIA: 'SET_DATA_ASISTENCIA',
    SET_DATA_GESTION_INFORMACION: 'SET_DATA_GESTION_INFORMACION',
    SET_DATA_GESTION_TAREAS: 'SET_DATA_GESTION_TAREAS',
    SET_DATA_GESTION_EQUIPO: 'SET_DATA_GESTION_EQUIPO',
    SET_DATA_GESTION_DOCUMENTOS: 'SET_DATA_GESTION_DOCUMENTOS',
    SET_DATA_GESTION_COMUNICACIONES: 'SET_DATA_GESTION_COMUNICACIONES',
    SET_DATA_GESTION_RIESGOS: 'SET_DATA_GESTION_RIESGOS',
    SET_DATA_GESTION_KPIS: 'SET_DATA_GESTION_KPIS',
    SET_DATA_PROVEEDOR: 'SET_DATA_PROVEEDO',
    SET_DATA_PROVEEDOR_GENERAL: 'SET_DATA_PROVEEDOR_GENERAL',
    SET_DATA_PROVEEDOR_COMERCIAL: 'SET_DATA_PROVEEDOR_COMERCIAL',
    SET_DATA_PROVEEDOR_FINANCIERA: 'SET_DATA_PROVEEDOR_FINANCIERA',
    SET_DATA_PROVEEDOR_EVALUACION: 'SET_DATA_PROVEEDOR_EVALUACION',
    SET_DATA_PROVEEDOR_ADICIONAL: 'SET_DATA_PROVEEDOR_ADICIONAL',
    SET_DATA_MARCA: 'SET_DATA_MARCA',
    SET_DATA_PRODUCTO_DETALLES: 'SET_DATA_PRODUCTO_DETALLES',
    SET_DATA_PRODUCTO_PRECIOS: 'SET_DATA_PRODUCTO_PRECIOS',
    SET_DATA_PRODUCTO_CARACTERISTICAS: 'SET_DATA_PRODUCTO_CARACTERISTICAS',
    SET_DATA_PRODUCTO_FOTOS: 'SET_DATA_PRODUCTO_FOTOS',

    SET_DATOS_PASO_PERSONAL: 'SET_DATOS_PASO_PERSONAL',
    SET_DATOS_PASO_FACTURA: 'SET_DATOS_PASO_FACTURA',
    SET_DATOS_PASO_ESTADO: 'SET_DATOS_PASO_ESTADO',
    SET_DATOS_PASO_GESTION_PROYECTOS: 'SET_DATOS_GESTION_PROYECTO',
    SET_DATOS_PASO_PROVEEDOR: 'SET_DATOS_PASO_PROVEEDOR',
    SET_DATOS_PASO_PRODUCTO: 'SET_DATOS_PASO_PRODUCTO'
}

export const set_authenticated = authenticated => {
    return {
        authenticated,
        type: datatypes.SET_AUTHENTICATED
    }
}

export const set_open_menu_lateral = open_menu_lateral => {
    return {
        open_menu_lateral,
        type: datatypes.SET_OPEN_MENU_LATERAL
    }
}

export const set_opcion_menu_lateral = opcion_menu_lateral => {
    return {
        opcion_menu_lateral,
        type: datatypes.SET_OPCION_MENU_LATERAL
    }
}

export const set_data_negocio = data_negocio => {
    return {
        data_negocio,
        type: datatypes.SET_DATA_NEGOCIO
    }
}

export const set_data_tipo_proyecto = data_tipo_proyecto => {
    return {
        data_tipo_proyecto,
        type: datatypes.SET_DATA_TIPO_PROYECTO
    }
}

export const set_data_proyecto = data_proyecto => {
    return {
        data_proyecto,
        type: datatypes.SET_DATA_PROYECTO
    }
}

export const set_data_cliente = data_cliente => {
    return {
        data_cliente,
        type: datatypes.SET_DATA_CLIENTE
    }
}

export const set_data_calificaciones = data_calificaciones => {
    return {
        data_calificaciones,
        type: datatypes.SET_DATA_CALIFICACIONES
    }
}

export const set_data_productos = data_productos => {
    return {
        data_productos,
        type: datatypes.SET_DATA_PRODUCTOS
    }
}

export const set_data_favoritos = data_favoritos => {
    return {
        data_favoritos,
        type: datatypes.SET_DATA_FAVORITOS
    }
}

export const set_data_compras = data_compras => {
    return {
        data_compras,
        type: datatypes.SET_DATA_COMPRAS
    }
}

export const set_data_suscriptores = data_suscriptores => {
    return {
        data_suscriptores,
        type: datatypes.SET_DATA_SUSCRIPTORES
    }
}

export const set_data_noticia = data_noticia => {
    return {
        data_noticia,
        type: datatypes.SET_DATA_NOTICIA
    }
}

export const set_data_categoria = data_categoria => {
    return {
        data_categoria,
        type: datatypes.SET_DATA_CATEGORIA
    }
}

export const set_data_categoria_noticia = data_categoria_noticia => {
    return {
        data_categoria_noticia,
        type: datatypes.SET_DATA_CATEGORIA_NOTICIA
    }
}

export const set_data_subcategoria = data_subcategoria => {
    return {
        data_subcategoria,
        type: datatypes.SET_DATA_SUBCATEGORIA
    }
}

export const set_data_servicio = data_servicio => {
    return {
        data_servicio,
        type: datatypes.SET_DATA_SERVICIO
    }
}

export const set_data_unidad = data_unidad => {
    return {
        data_unidad,
        type: datatypes.SET_DATA_UNIDAD
    }
}

export const set_data_departamento = data_departamento => {
    return {
        data_departamento,
        type: datatypes.SET_DATA_DEPARTAMENTO
    }
}

export const set_data_personal = data_personal => {
    return {
        data_personal,
        type: datatypes.SET_DATA_PERSONAL
    }
}

export const set_data_personal_personal = data_personal_personal => {
    return {
        data_personal_personal,
        type: datatypes.SET_DATA_PERSONAL_PERSONAL
    }
}

export const set_data_personal_ubicacion = data_personal_ubicacion => {
    return {
        data_personal_ubicacion,
        type: datatypes.SET_DATA_PERSONAL_UBICACION
    }
}

export const set_data_personal_estudios = data_personal_estudios => {
    return {
        data_personal_estudios,
        type: datatypes.SET_DATA_PERSONAL_ESTUDIOS
    }
}

export const set_data_personal_trabajo = data_personal_trabajo => {
    return {
        data_personal_trabajo,
        type: datatypes.SET_DATA_PERSONAL_TRABAJO
    }
}

export const set_data_personal_sueldo = data_personal_sueldo => {
    return {
        data_personal_sueldo,
        type: datatypes.SET_DATA_PERSONAL_SUELDO
    }
}

export const set_data_personal_evaluacion = data_personal_evaluacion => {
    return {
        data_personal_evaluacion,
        type: datatypes.SET_DATA_PERSONAL_EVALUACION
    }
}

export const set_data_administradores = data_administradores => {
    return {
        data_administradores,
        type: datatypes.SET_DATA_ADMINISTRADORES
    }
}

export const set_data_notificaciones = data_notificaciones => {
    return {
        data_notificaciones,
        type: datatypes.SET_DATA_NOTIFICACIONES
    }
}

export const set_data_mensajes = data_mensajes => {
    return {
        data_mensajes,
        type: datatypes.SET_DATA_MENSAJES
    }
}

export const set_data_reuniones = data_reuniones => {
    return {
        data_reuniones,
        type: datatypes.SET_DATA_REUNIONES
    }
}

export const set_data_gestion_proyectos = data_gestion_proyectos => {
    return {
        data_gestion_proyectos,
        type: datatypes.SET_DATA_GESTION_PROYECTOS
    }
}

export const set_datos_paso_personal = datos_paso_personal => {
    return {
        datos_paso_personal,
        type: datatypes.SET_DATOS_PASO_PERSONAL
    }
}

export const set_data_editable = data_editable => {
    return {
        data_editable,
        type: datatypes.SET_DATA_EDITABLE
    }
}

export const set_confirmacion_eliminacion = confirmacion_eliminacion => {
    return {
        confirmacion_eliminacion,
        type: datatypes.SET_CONFIRMACION_ELIMINACION
    }
}

export const set_error_message = error_message => {
    return {
        error_message,
        type: datatypes.SET_ERROR_MESSAGE
    }
}

export const set_data_nomina = data_nomina => {
    return {
        data_nomina,
        type: datatypes.SET_DATA_NOMINAS
    }
}

export const set_data_facturacion = data_facturacion => {
    return {
        data_facturacion,
        type: datatypes.SET_DATA_FACTURACION
    }
}

export const set_datos_paso_factura = datos_paso_factura => {
    return {
        datos_paso_factura,
        type: datatypes.SET_DATOS_PASO_FACTURA
    }
}

export const set_data_facturacion_cliente = data_facturacion_cliente => {
    return {
        data_facturacion_cliente,
        type: datatypes.SET_DATA_FACTURACION_CLIENTE
    }
}

export const set_data_facturacion_fiscal = data_facturacion_fiscal => {
    return {
        data_facturacion_fiscal,
        type: datatypes.SET_DATA_FACTURACION_FISCAL
    }
}

export const set_data_facturacion_productos = data_facturacion_productos => {
    return {
        data_facturacion_productos,
        type: datatypes.SET_DATA_FACTURACION_PRODUCTOS
    }
}

export const set_data_facturacion_factura = data_facturacion_factura => {
    return {
        data_facturacion_factura,
        type: datatypes.SET_DATA_FACTURACION_FACTURA
    }
}

export const set_data_estado_trabajo = data_estado_trabajo => {
    return {
        data_estado_trabajo,
        type: datatypes.SET_DATA_ESTADO_TRABAJO
    }
}

export const set_datos_paso_estado = datos_paso_estado => {
    return {
        datos_paso_estado,
        type: datatypes.SET_DATOS_PASO_ESTADO
    }
}

export const set_data_estado_trabajador = data_estado_trabajador => {
    return {
        data_estado_trabajador,
        type: datatypes.SET_DATA_ESTADO_TRABAJADOR
    }
}

export const set_data_estado_reemplazo = data_estado_reemplazo => {
    return {
        data_estado_reemplazo,
        type: datatypes.SET_DATA_ESTADO_REEMPLAZO
    }
}

export const set_data_gestion_informacion = data_gestion_informacion => {
    return {
        data_gestion_informacion,
        type: datatypes.SET_DATA_GESTION_INFORMACION
    }
}

export const set_data_gestion_tareas = data_gestion_tareas => {
    return {
        data_gestion_tareas,
        type: datatypes.SET_DATA_GESTION_TAREAS
    }
}

export const set_data_gestion_equipo = data_gestion_equipo => {
    return {
        data_gestion_equipo,
        type: datatypes.SET_DATA_GESTION_EQUIPO
    }
}

export const set_data_gestion_documentos = data_gestion_documentos => {
    return {
        data_gestion_documentos,
        type: datatypes.SET_DATA_GESTION_DOCUMENTOS
    }
}

export const set_data_gestion_comunicaciones = data_gestion_comunicaciones => {
    return {
        data_gestion_comunicaciones,
        type: datatypes.SET_DATA_GESTION_COMUNICACIONES
    }
}

export const set_data_gestion_riesgos = data_gestion_riesgos => {
    return {
        data_gestion_riesgos,
        type: datatypes.SET_DATA_GESTION_RIESGOS
    }
}

export const set_data_gestion_kpis = data_gestion_kpis => {
    return {
        data_gestion_kpis,
        type: datatypes.SET_DATA_GESTION_KPIS
    }
}

export const set_data_asistencia = data_asistencia => {
    return {
        data_asistencia,
        type: datatypes.SET_DATA_ASISTENCIA
    }
}

export const set_datos_paso_gestion_proyectos = datos_paso_gestion_proyectos => {
    return {
        datos_paso_gestion_proyectos,
        type: datatypes.SET_DATOS_PASO_GESTION_PROYECTOS
    }
}

export const set_data_proveedor = data_proveedor => {
    return {
        data_proveedor,
        type: datatypes.SET_DATA_PROVEEDOR
    }
}

export const set_data_proveedor_general = data_proveedor_general => {
    return {
        data_proveedor_general,
        type: datatypes.SET_DATA_PROVEEDOR_GENERAL
    }
}

export const set_data_proveedor_comercial = data_proveedor_comercial => {
    return {
        data_proveedor_comercial,
        type: datatypes.SET_DATA_PROVEEDOR_COMERCIAL
    }
}

export const set_data_proveedor_financiera = data_proveedor_financiera => {
    return {
        data_proveedor_financiera,
        type: datatypes.SET_DATA_PROVEEDOR_FINANCIERA
    }
}

export const set_data_proveedor_evaluacion = data_proveedor_evaluacion => {
    return {
        data_proveedor_evaluacion,
        type: datatypes.SET_DATA_PROVEEDOR_EVALUACION
    }
}

export const set_data_proveedor_adicional = data_proveedor_adicional => {
    return {
        data_proveedor_adicional,
        type: datatypes.SET_DATA_PROVEEDOR_ADICIONAL
    }
}

export const set_datos_paso_proveedor = datos_paso_proveedor => {
    return {
        datos_paso_proveedor,
        type: datatypes.SET_DATOS_PASO_PROVEEDOR
    }
}

export const set_data_marca = data_marca => {
    return {
        data_marca,
        type: datatypes.SET_DATA_MARCA
    }
}

export const set_datos_paso_producto = datos_paso_producto => {
    return {
        datos_paso_producto,
        type: datatypes.SET_DATOS_PASO_PRODUCTO
    }
}

export const set_data_producto_detalles = data_producto_detalles => {
    return {
        data_producto_detalles,
        type: datatypes.SET_DATA_PRODUCTO_DETALLES
    }
}

export const set_data_producto_precios = data_producto_precios => {
    return {
        data_producto_precios,
        type: datatypes.SET_DATA_PRODUCTO_PRECIOS
    }
}

export const set_data_producto_caracteristicas = data_producto_caracteristicas => {
    return {
        data_producto_caracteristicas,
        type: datatypes.SET_DATA_PRODUCTO_CARACTERISTICAS
    }
}

export const set_data_producto_fotos = data_producto_fotos => {
    return {
        data_producto_fotos,
        type: datatypes.SET_DATA_PRODUCTO_FOTOS
    }
}