import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const filesdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'file_upload':
        case 'file_upload_foto_perfil':
        case 'file_upload_documento':
        case 'file_upload_cuarta_categoria':
        case 'file_upload_evaluacion':
        case 'file_upload_estado_trabajo':
        case 'file_upload_logo_proveedor':
        case 'file_upload_logo_marca':
        case 'file_upload_fotos_productos':
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

const datFiles = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (filesdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (filesdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (filesdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default datFiles.reducer