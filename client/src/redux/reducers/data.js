import {datatypes} from '../actions/data.js'

const initial_state = {
    authenticated: false,
    open_menu_lateral: true,

    data_negocio: {},
    data_tipo_proyecto: {},
    data_proyecto: {},
    data_cliente: {},
    data_producto: {},
    data_favoritos: {},
    data_calificaciones: {},
    data_compras: {},
    data_suscriptores: {},
    data_noticia: {},
    data_categoria: {},
    data_subcategoria: {},
    data_servicio: {},
    data_unidad: {}
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
    }else if (action.type === datatypes.SET_DATA_PRODUCTO){
        const data_producto = action.data_producto
        return {
            ... state,
            data_producto
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
    }else{
        return state
    }
}

export default data