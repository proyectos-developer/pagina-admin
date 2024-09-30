import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

import {Provider} from 'react-redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import data from './redux/reducers/data.js'
import begindata from './redux/slice/begindata.js'
import filesdata from './redux/slice/filesdata.js'
import tipoproyectosdata from './redux/slice/tipoproyectosdata.js'
import proyectosdata from './redux/slice/proyectosdata.js'
import gestionproyectosdata from './redux/slice/gestionproyectosdata.js'
import productosdata from './redux/slice/productosdata.js'
import categoriasdata from './redux/slice/categoriasdata.js'
import subcategoriasdata from './redux/slice/subcategoriasdata.js'
import unidadesdata from './redux/slice/unidadesdata.js'
import negociosdata from './redux/slice/negociosdata.js'
import favoritosdata from './redux/slice/favoritosdata.js'
import calificacionesdata from './redux/slice/calificacionesdata.js'
import clientesdata from './redux/slice/clientesdata.js'
import comprasdata from './redux/slice/comprasdata.js'
import suscripcionesdata from './redux/slice/suscripcionesdata.js'
import categorias_noticiasdata from './redux/slice/categorias_noticiasdata.js'
import noticiasdata from './redux/slice/noticiasdata.js'
import personaldata from './redux/slice/personaldata.js'
import locationdata from './redux/slice/locationdata.js'
import institutosdata from './redux/slice/institutosdata.js'

import notificacionesdata from './redux/slice/notificacionesdata.js'
import mensajesdata from './redux/slice/mensajesdata.js'
import reunionesdata from './redux/slice/reunionesdata.js'

import correosdata from './redux/slice/correosdata.js'
import serviciosdata from './redux/slice/serviciosdata.js'
import departamentosdata from './redux/slice/departamentosdata.js'
import administradoresdata from './redux/slice/administradoresdata.js'

const store = configureStore ({
    reducer: ({
        data_actions: data,
        begin_data: begindata,
        files_data: filesdata,
        negocios_data: negociosdata,
        tipoproyectos_data: tipoproyectosdata,
        proyectos_data: proyectosdata,
        gestionproyectos_data: gestionproyectosdata,
        productos_data: productosdata,
        categorias_data: categoriasdata,
        subcategorias_data: subcategoriasdata,
        unidades_data: unidadesdata,
        favoritos_data: favoritosdata,
        calificaciones_data: calificacionesdata,
        clientes_data: clientesdata,
        compras_data: comprasdata,
        suscripciones_data: suscripcionesdata,
        categorias_noticias_data: categorias_noticiasdata,
        noticias_data: noticiasdata,
        departamentos_data: departamentosdata,
        personal_data: personaldata,
        location_data: locationdata,
        institutos_data: institutosdata,

        reuniones_data: reunionesdata,
        mensajes_data: mensajesdata,
        notificaciones_data: notificacionesdata,

        correos_data: correosdata,
        servicios_data: serviciosdata,
        administradores_data: administradoresdata
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
