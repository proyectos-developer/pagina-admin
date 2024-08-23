import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {Provider} from 'react-redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import data from './redux/reducers/data.js'
import filesdata from './redux/slice/filesdata.js'
import tipoproyectosdata from './redux/slice/tipoproyectosdata.js'
import proyectosdata from './redux/slice/proyectosdata.js'
import productosdata from './redux/slice/productosdata.js'
import categoriasdata from './redux/slice/categoriasdata.js'
import subcategoriasdata from './redux/slice/subcategoriasdata.js'
import unidadesdata from './redux/slice/unidadesdata.js'
import negociosdata from './redux/slice/negociosdata.js'
import begindata from './redux/slice/begindata.js'
import clientesdata from './redux/slice/clientesdata.js'
import favoritosdata from './redux/slice/favoritosdata.js'
import calificacionesdata from './redux/slice/calificacionesdata.js'
import comprasdata from './redux/slice/comprasdata.js'
import correosdata from './redux/slice/correosdata.js'
import noticiasdata from './redux/slice/noticiasdata.js'
import serviciosdata from './redux/slice/serviciosdata.js'
import areasempresadata from './redux/slice/areasempresadata.js'
import trabajadoresdata from './redux/slice/trabajadoresdata.js'
import administradoresdata from './redux/slice/administradoresdata.js'
import suscripcionesdata from './redux/slice/suscripcionesdata.js'

const store = configureStore ({
    reducer: ({
        data_actions: data,
        files_data: filesdata,
        negocios_data: negociosdata,
        tipoproyectos_data: tipoproyectosdata,
        proyectos_data: proyectosdata,
        productos_data: productosdata,
        categorias_data: categoriasdata,
        subcategorias_data: subcategoriasdata,
        unidades_data: unidadesdata,
        favoritos_data: favoritosdata,
        begin_data: begindata,
        clientes_data: clientesdata,
        calificaciones_data: calificacionesdata,
        compras_data: comprasdata,
        correos_data: correosdata,
        noticias_data: noticiasdata,
        servicios_data: serviciosdata,
        areasempresa_data: areasempresadata,
        trabajadores_data: trabajadoresdata,
        administradores_data: administradoresdata,
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
