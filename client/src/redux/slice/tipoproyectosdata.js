import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const tipoproyectosdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_tipo_proyecto':
        case 'update_tipo_proyecto':
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
        case 'get_tipo_proyectos_filter':
        case 'get_tipo_proyecto':
        case 'delete_tipo_proyecto':
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

const dataTipoProyecto = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (tipoproyectosdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (tipoproyectosdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (tipoproyectosdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataTipoProyecto.reducer