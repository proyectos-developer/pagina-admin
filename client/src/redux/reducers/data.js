import {datatypes} from '../actions/data.js'

const initial_state = {
    authenticated: false,
    open_menu_lateral: true,
    opcion_menu_lateral: {},

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
    data_administradores: {},
    data_notificaciones: {},
    data_mensajes: {},
    data_reuniones: {},
    data_gestion_proyectos: {}
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
    }else{
        return state
    }
}

export default data