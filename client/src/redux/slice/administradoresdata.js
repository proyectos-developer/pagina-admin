import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const administradoresdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_administrador':
        case 'update_administrador':
        case 'update_administrador_habilitado':
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
        case 'get_administradores':
        case 'get_administrador':
        case 'delete_administrador':
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

const dataFavoritos = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (administradoresdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (administradoresdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (administradoresdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataFavoritos.reducer