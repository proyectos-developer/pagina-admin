import { constantes } from "./constantes"

export const facturasConstants = (id = 1, search = 0, tipo = 0, fecha = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_factura: {
            path: `factura`,
            stateType: 'new_factura',
            reset: reset,
            data: data
        }, 
        update_factura: {
            path: `factura/${id}`,
            stateType: 'update_factura',
            reset: reset,
            data: data
        }, 
        update_factura_cliente: {
            path: `factura/data/cliente/${id}`,
            stateType: 'update_factura_cliente',
            reset: reset,
            data: data
        }, 
        update_factura_fiscal: {
            path: `factura/data/fiscal/${id}`,
            stateType: 'update_factura_fiscal',
            reset: reset,
            data: data
        }, 
        update_datos_factura: {
            path: `factura/data/factura/${id}`,
            stateType: 'update_datos_factura',
            reset: reset,
            data: data
        }, 
        get_nro_facturas: {
            path: `nro_facturas`,
            stateType: 'get_nro_facturas',
            reset: reset
        },
        get_facturas_filter: {
            path: `factura/search/${search}/fecha/${tipo}/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_facturas_filter',
            reset: reset
        },   
        get_factura: {
            path: `factura/${id}`,
            stateType: 'get_factura',
            reset: reset
        },   
        get_factura_cliente: {
            path: `factura/data/cliente/${id}`,
            stateType: 'get_factura_cliente',
            reset: reset
        },   
        get_factura_fiscal: {
            path: `factura/data/fiscal/${id}`,
            stateType: 'get_factura_fiscal',
            reset: reset
        },   
        get_datos_factura: {
            path: `factura/data/factura/${id}`,
            stateType: 'get_datos_factura',
            reset: reset
        },
        delete_factura: {
            path: `delete/factura/${id}`,
            stateType: 'delete_factura',
            reset: reset
        },
        new_producto_factura: {
            path: `factura/producto/facturacion`,
            stateType: 'new_producto_factura',
            reset: reset,
            data: data
        },  
        update_producto_factura: {
            path: `factura/producto/facturacion/${id}/${search}`,
            stateType: 'update_producto_factura',
            reset: reset,
            data: data
        },
        update_productos_factura: {
            path: `factura/productos/factura/${id}`,
            stateType: 'update_productos_factura',
            reset: reset,
            data: data
        },
        get_productos_factura_filter: {
            path: `productos/factura/${id}`,
            stateType: 'get_productos_factura_filter',
            reset: reset
        },  
        delete_producto_factura: {
            path: `delete/producto/factura/${id}/${search}`,
            stateType: 'delete_producto_factura',
            reset: reset
        },
        new_pago_factura: {
            path: `pago/factura`,
            stateType: 'new_pago_factura',
            reset: reset,
            data: data
        },   
        get_pagos_facturas_filter: {
            path: `pagos/facturas/${search}/fecha_pago/${fecha}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_pagos_facturas',
            reset: reset
        },
    }
}