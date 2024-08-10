export const datatypes = {
    SET_AUTHENTICATED: 'SET_AUTENTICATED',
    SET_OPEN_MENU_LATERAL: 'SET_OPEN_MENU_LATERAL',

    SET_DATA_NEGOCIO: 'SET_DATA_NEGOCIO',
    SET_DATA_TIPO_PROYECTO: 'SET_DATA_TIPO_PROYECTO',
    SET_DATA_PROYECTO: 'SET_DATA_PROYECTO'
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