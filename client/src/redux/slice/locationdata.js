import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const locationdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'get_location_paises':
        case 'get_location_provincias':
        case 'get_location_distritos':
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

const dataLocation = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (locationdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (locationdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (locationdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataLocation.reducer