import { constantes } from "./constantes"

export const categoriasnoticiasConstants = (id = 1, search = 0, order_by = 0, order = 0, begin = 0, amount = 16, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_categoria_noticia: {
            path: `categoria_noticia`,
            stateType: 'new_categoria_noticia',
            reset: reset,
            data: data
        }, 
        update_categoria_noticia: {
            path: `categoria_noticia/${id}`,
            stateType: 'update_categoria_noticia',
            reset: reset,
            data: data
        },  
        get_categorias_noticias_filter: {
            path: `categorias_noticias/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_categorias_noticias_filter',
            reset: reset
        },   
        get_categoria_noticia: {
            path: `categoria_noticia/${id}`,
            stateType: 'get_categoria_noticia',
            reset: reset
        },
        delete_categoria_noticia: {
            path: `delete/categoria_noticia/${id}`,
            stateType: 'delete_categoria_noticia',
            reset: reset
        }
    }
}