export const datatypes = {
    SET_AUTHENTICATED: 'SET_AUTENTICATED',
    SET_OPEN_MENU_LATERAL: 'SET_OPEN_MENU_LATERAL',

    SET_DATA_NEGOCIO: 'SET_DATA_NEGOCIO',
    SET_DATA_TIPO_PROYECTO: 'SET_DATA_TIPO_PROYECTO',
    SET_DATA_PROYECTO: 'SET_DATA_PROYECTO',
    SET_DATA_CLIENTE: 'SET_DATA_CLIENTE',
    SET_DATA_PRODUCTO: 'SET_DATA_PRODUCTO',
    SET_DATA_FAVORITOS: 'SET_DATA_FAVORITOS',
    SET_DATA_CALIFICACIONES: 'SET_DATA_CALIFICACIONES',
    SET_DATA_COMPRAS: 'SET_DATA_COMPRAS',
    SET_DATA_SUSCRIPTORES: 'SET_DATA_SUSCRIPTORES'
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

export const set_data_producto = data_producto => {
    return {
        data_producto,
        type: datatypes.SET_DATA_PRODUCTO
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