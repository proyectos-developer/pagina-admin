import { constantes } from "./constantes"

export const noticiasConstants = (id = 1, search = '', fecha = 0, order_by = 0, order = 0, begin = 0, amount = 0, data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_noticia: {
            path: `noticia`,
            stateType: 'new_noticia',
            reset: reset,
            data: data
        }, 
        update_noticia: {
            path: `noticia/${id}`,
            stateType: 'update_noticia',
            reset: reset,
            data: data
        },  
        habilitar_comentarios_noticia: {
            path: `noticia/habilitar/${id}`,
            stateType: 'habilitar_comentarios_noticia',
            reset: reset,
            data: data
        },  
        get_noticias_filter: {
            path: `noticias/categoria/${id}/fecha/${fecha}/search/${search}/order_by/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_noticias_filter',
            reset: reset
        },   
        get_noticia: {
            path: `noticia/${id}`,
            stateType: 'get_noticia',
            reset: reset
        },
        delete_noticia: {
            path: `delete/noticia/${id}`,
            stateType: 'delete_noticia',
            reset: reset
        }
    }
}