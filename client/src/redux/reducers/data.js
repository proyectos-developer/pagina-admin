import {datatypes} from '../actions/data.js'

const initial_state = {
    authenticated: false,
    open_menu_lateral: true,

    data_negocio: {},
    data_tipo_proyecto: {},
    data_proyecto: {}
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
    }else{
        return state
    }
}

export default data