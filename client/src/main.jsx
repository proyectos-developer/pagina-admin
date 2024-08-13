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
import correosdata from './redux/slice/correosdata.js'

const store = configureStore ({
    reducer: ({
        data_actions: data,
        negocios_data: negociosdata,
        tipoproyectos_data: tipoproyectosdata,
        proyectos_data: proyectosdata,
        begin_data: begindata,
        clientes_data: clientesdata,
        productos_data: productosdata,
        correos_data: correosdata
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
