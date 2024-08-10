import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {Provider} from 'react-redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import data from './redux/reducers/data.js'
import negociosdata from './redux/slice/negociosdata.js'
import tipoproyectosdata from './redux/slice/tipoproyectosdata.js'
import proyectosdata from './redux/slice/proyectosdata.js'

const store = configureStore ({
    reducer: ({
        data_actions: data,
        negocios_data: negociosdata,
        tipoproyectos_data: tipoproyectosdata,
        proyectos_data: proyectosdata
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
