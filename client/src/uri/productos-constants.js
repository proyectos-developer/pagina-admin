import { constantes } from "./constantes"

export const productosConstants = (id = 1, search = '', tipo = 0, id_tipo = 0, minimo = 0, maximo = 0, order_by = '', order = '', begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_producto: {
            path: `producto`,
            stateType: 'new_producto',
            reset: reset,
            data: data
        }, 
        update_producto: {
            path: `producto/${id}`,
            stateType: 'update_producto',
            reset: reset,
            data: data
        },  
        update_producto_detalles: {
            path: `producto/data/detalles/${id}`,
            stateType: 'update_producto_detalles',
            reset: reset,
            data: data
        },  
        update_producto_precios: {
            path: `producto/data/precios/${id}`,
            stateType: 'update_producto_precios',
            reset: reset,
            data: data
        },  
        update_producto_caracteristicas: {
            path: `producto/data/caracteristicas/${id}`,
            stateType: 'update_producto_caracteristicas',
            reset: reset,
            data: data
        },  
        update_producto_fotos: {
            path: `producto/data/fotos/${id}`,
            stateType: 'update_producto_fotos',
            reset: reset,
            data: data
        },  
        update_habilitar_producto: {
            path: `producto/habilitar/${id}`,
            stateType: 'update_habilitar_producto',
            reset: reset,
            data: data
        },  
        get_productos_filter: {
            path: `productos/search/${search}/tipo/${tipo}/${id_tipo}/precio/${minimo}/${maximo}/orderby/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_productos_filter',
            reset: reset
        },   
        get_producto_categorias_unidades_servicios:{
            path: `producto/categorias/unidades/servicios`,
            stateType: 'get_producto_categorias_unidades_servicios',
            reset: reset
        },
        get_producto: {
            path: `producto/${id}`,
            stateType: 'get_producto',
            reset: reset
        },
        get_producto_detalles: {
            path: `producto/data/detalles/${id}`,
            stateType: 'get_producto_detalles',
            reset: reset,
        },  
        get_producto_precios: {
            path: `producto/data/precios/${id}`,
            stateType: 'get_producto_precios',
            reset: reset,
        },  
        get_producto_caracteristicas: {
            path: `producto/data/caracteristicas/${id}`,
            stateType: 'get_producto_caracteristicas',
            reset: reset,
        },  
        get_producto_fotos: {
            path: `producto/data/fotos/${id}`,
            stateType: 'get_producto_fotos',
            reset: reset,
        },  
        delete_producto: {
            path: `delete/producto/${id}`,
            stateType: 'delete_producto',
            reset: reset
        }
    }
}