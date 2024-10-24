import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { constantes } from "../../uri/constantes"

const baseurl = `${constantes().url_principal[0].url}`
let stateType = ''

export const facturasdata = createAsyncThunk ('', async (params) => {
    stateType = params.stateType
    switch (stateType){
        case 'new_factura':
        case 'update_factura':
        case 'update_factura_cliente':
        case 'update_factura_fiscal':
        case 'update_datos_factura':
        case 'new_producto_factura':
        case 'new_pago_factura':
        case 'update_producto_factura':
        case 'update_productos_factura':
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
        case 'get_nro_facturas':
        case 'get_facturas_filter':
        case 'get_factura':
        case 'get_factura_cliente':
        case 'get_factura_fiscal':
        case 'get_datos_factura':
        case 'delete_factura':
        case 'get_productos_factura_filter':
        case 'delete_producto_factura':
        case 'get_pagos_facturas_filter':
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

const dataFactura = createSlice ({
    name: 'fetch',
    initialState: initialState (stateType),
    extraReducers: (builder) => {
        builder.addCase (facturasdata.pending, (state) => {
            state.loading = true
        }),
        builder.addCase (facturasdata.fulfilled, (state, action) => {
            state.loading = false
            state.finishWithErrors = false
            state[stateType] = action.payload
        }),
        builder.addCase (facturasdata.rejected, (state) => {
            state.loading = false
            state.finishWithErrors = true
        })
    }
})

export default dataFactura.reducer