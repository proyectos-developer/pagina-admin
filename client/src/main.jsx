import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {Provider} from 'react-redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import data from './redux/reducers/data.js'
import negociosdata from './redux/slice/negociosdata.js'
import tipoproyectosdata from './redux/slice/tipoproyectosdata.js'
import proyectosdata from './redux/slice/proyectosdata.js'
import begindata from './redux/slice/begindata.js'
import clientesdata from './redux/slice/clientesdata.js'
import productosdata from './redux/slice/productosdata.js'
import favoritosdata from './redux/slice/favoritosdata.js'
import calificacionesdata from './redux/slice/calificacionesdata.js'
import comprasdata from './redux/slice/comprasdata.js'
import correosdata from './redux/slice/correosdata.js'
import noticiasdata from './redux/slice/noticiasdata.js'
import categoriasdata from './redux/slice/categoriasdata.js'
import subcategoriasdata from './redux/slice/subcategoriasdata.js'
import unidadesdata from './redux/slice/unidadesdata.js'
import serviciosdata from './redux/slice/serviciosdata.js'
import suscripcionesdata from './redux/slice/suscripcionesdata.js'

const store = configureStore ({
    reducer: ({
        data_actions: data,
        negocios_data: negociosdata,
        tipoproyectos_data: tipoproyectosdata,
        proyectos_data: proyectosdata,
        begin_data: begindata,
        clientes_data: clientesdata,
        productos_data: productosdata,
        favoritos_data: favoritosdata,
        calificaciones_data: calificacionesdata,
        compras_data: comprasdata,
        correos_data: correosdata,
        noticias_data: noticiasdata,
        categorias_data: categoriasdata,
        subcategorias_data: subcategoriasdata,
        unidades_data: unidadesdata,
        servicios_data: serviciosdata,
        suscripciones_data: suscripcionesdata
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
