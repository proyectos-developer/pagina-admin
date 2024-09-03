import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const gestionproyectosdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_informe_proyecto':
        case 'update_informe_proyecto':
        case 'new_trabajador_proyecto':
        case 'update_trabajador_proyecto':
        case 'new_actividad_proyecto':
        case 'update_actividad_proyecto':
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
        case 'get_informes_proyectos_filter':
        case 'get_informe_proyecto':
        case 'delete_informe_proyecto':
        case 'get_actividades_proyecto_filter':
        case 'get_actividad_proyecto':
        case 'delete_actividad_proyecto':
        case 'get_trabajadores_proyecto_filter':
        case 'get_trabajador_proyecto':
        case 'get_datos_trabajador_proyecto':
        case 'delete_trabajador_proyecto':
        case 'get_documentos_proyecto_filter':
        case 'get_documento_proyecto':
        case 'delete_documento_proyecto':
        case 'get_comunicaciones_proyecto_filter':
        case 'get_comunicacion_proyecto':
        case 'delete_comunicacion_proyecto':
        case 'get_riesgos_proyecto_filter':
        case 'get_riesgo_proyecto':
        case 'delete_riesgo_proyecto':
        case 'get_kpis_proyecto_filter':
        case 'get_kpi_proyecto':
        case 'delete_kpi_proyecto':
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