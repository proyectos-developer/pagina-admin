import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const personaldata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_personal':
        case 'update_personal':
        case 'update_personal_personal':
        case 'update_personal_comunicacion':
        case 'update_personal_estudios':
        case 'update_personal_trabajo':
        case 'update_personal_sueldo':
        case 'update_personal_evaluacion':
        case 'new_estado':
        case 'update_estado':
        case 'update_estado_trabajador':
        case 'update_estado_reemplazo':
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
        case 'get_personal_filter':
        case 'get_personal':
        case 'get_personal_personal':
        case 'get_personal_comunicacion':
        case 'get_personal_estudios':
        case 'get_personal_trabajo':
        case 'get_personal_sueldo':
        case 'get_personal_evaluacion':
        case 'delete_personal':
        case 'get_cumpleanios_hoy':
        case 'get_cumpleanios_filter':
        case 'get_estados_filter':
        case 'get_estado':
        case 'delete_estado':
        case 'get_estado_trabajador':
        case 'get_estado_reemplazo':
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

const dataPersonal = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (personaldata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (personaldata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (personaldata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataPersonal.reducer