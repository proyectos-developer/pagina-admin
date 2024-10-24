import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const gestionproyectosdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_gestion_proyecto':
        case 'update_gestion_proyecto':
        case 'new_equipo_proyecto':
        case 'update_equipo_proyecto':
        case 'new_tarea_proyecto':
        case 'update_tarea_proyecto':
        case 'new_documento_proyecto':
        case 'update_documento_proyecto':
        case 'new_comunicacion_proyecto':
        case 'update_comunicacion_proyecto':
        case 'new_riesgo_proyecto':
        case 'update_riesgo_proyecto':
        case 'new_kpi_proyecto':
        case 'update_kpi_proyecto':
            if (params.reset){ 
                return {success: false}
            }else{
                try{
                    const response = await axios.post (`${baseurl}/${params.path}`, params.data)
                    return response.data
                }catch (err){
                    return err.message
                }
            }
        case 'get_gestion_proyectos_filter':
        case 'get_gestion_proyecto':
        case 'delete_gestion_proyecto':
        case 'get_tareas_proyectos_filter':
        case 'get_tarea_proyecto':
        case 'get_equipos_proyectos_filter':
        case 'get_equipo_proyecto':
        case 'get_datos_equipo_proyecto':
        case 'get_trabajador_equipo_proyecto':
        case 'get_documentos_proyectos_filter':
        case 'get_carpetas_documentos_proyecto':
        case 'get_documento_proyecto':
        case 'get_comunicaciones_proyectos_filter':
        case 'get_comunicacion_proyecto':
        case 'get_riesgos_proyectos_filter':
        case 'get_riesgo_proyecto':
        case 'get_kpis_proyectos_filter':
        case 'get_kpi_proyecto':
            if (params.reset){ 
                return {success: false}
            }else{
                try{
                    const response = await axios.get (`${baseurl}/${params.path}`)
                    return response.data
                }catch (err){
                    return err.message
                }
            }
        default: return null
    }
})

const initialState = (type) => {
    return {
        [type]: [],
        loading: false,
        finishWithErrors: false,
        errorMessage: 'Hemos tenido problemas solicitando la información'
    }
}

const dataGestionProyecto = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (gestionproyectosdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (gestionproyectosdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (gestionproyectosdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataGestionProyecto.reducer