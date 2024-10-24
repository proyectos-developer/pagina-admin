import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const proveedoresdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_proveedor':
        case 'update_proveedor_general':
        case 'update_proveedor_comercial':
        case 'update_proveedor_financiera':
        case 'update_proveedor_evaluacion':
        case 'update_proveedor_adicional':
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
        case 'get_proveedores_filter':
        case 'get_proveedor_general':
        case 'get_proveedor_comercial':
        case 'get_proveedor_financiera':
        case 'get_proveedor_evaluacion':
        case 'get_proveedor_adicional':
        case 'delete_proveedor':
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

const dataProveedores = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (proveedoresdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (proveedoresdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (proveedoresdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataProveedores.reducer