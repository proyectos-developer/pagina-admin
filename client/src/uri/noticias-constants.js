import { constantes } from "./constantes"

export const noticiasConstants = (id = 1, search = '', begin = 0, amount = 0, data = {}, reset = false) => {
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
            path: `noticias/categoria/${id}/search/${search}/${begin}/${amount}`,
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