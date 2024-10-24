import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_facturacion_fiscal, set_datos_paso_factura, set_error_message } from '../../../../redux/actions/data'

export default function DatosFiscalesTablet ({proporcional}) {

    const dispatch = useDispatch()

    const [id_cliente, setIdCliente] = useState('')
    const [razon_social, setRazonSocial] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    const [direccion_fiscal, setDireccionFiscal] = useState('')
    
    const [erazon_social, setERazonSocial] = useState(false)
    const [enro_ruc, setENroRuc] = useState(false)
    const [edireccion_fiscal, setEDireccionFiscal] = useState(false)

    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_siguiente, setBotonSiguiente] = useState(false)

    const {data_facturacion_fiscal} = useSelector(({data_actions}) => data_actions)
    const {new_factura} = useSelector(({facturas_data}) => facturas_data)

    useEffect(() => {
        if (data_facturacion_fiscal && data_facturacion_fiscal.razon_social){
            setIdCliente(data_facturacion_fiscal.id_cliente)
            setRazonSocial(data_facturacion_fiscal.razon_social)
            setNroRuc(data_facturacion_fiscal.nro_ruc)
            setDireccionFiscal(data_facturacion_fiscal.direccion_fiscal)
        }else{
            setIdCliente('')
            setRazonSocial('')
            setNroRuc('')
            setDireccionFiscal('')
        }
    }, [])

    useEffect(() => {
        if (new_factura && new_factura.success === true && new_factura.factura){
            setIdClient('')
            setIdCliente('')
            setRazonSocial('')
            setNroRuc('')
            setDireccionFiscal('')
        }else if (new_factura && new_factura.success === false && new_factura.factura){
            dispatch (set_error_message(true))
        }
    }, [new_factura])

    const continuar_datos_productos = () => {
        if (razon_social === '' && nro_ruc === '' && direccion_fiscal === ''){
            setERazonSocial (razon_social === '' ? true : false)
            setENroRuc (nro_ruc === '' ? true : false)
            setEDireccionFiscal (total === '' ? true : false)
        }else{
            setERazonSocial (false)
            setENroRuc (false)
            setEDireccionFiscal (false)
            const data_factura = {
                id_cliente: id_cliente === '' ? 0 : id_cliente,
                razon_social: razon_social,
                nro_ruc: nro_ruc,
                direccion_fiscal: direccion_fiscal,
            }
            dispatch (set_data_facturacion_fiscal(data_factura))
            dispatch (set_datos_paso_factura('productos'))
        }
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Razón social</strong></span>
                    <input
                        type='default'
                        id='razon_social'
                        value={razon_social}
                        className='form-control rounded'
                        onChange={(event) => setRazonSocial(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: erazon_social ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Razón social'/>
                </div>  
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Nro R.U.C</strong></span>
                    <input
                        type='number'
                        id='nro_ruc'
                        value={nro_ruc}
                        className='form-control rounded'
                        onChange={(event) => setNroRuc(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: enro_ruc ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Número de R.U.C'/>
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                    <span className='position-absolute'  
                        style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                            left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                            background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                            <strong>Dirección fiscal</strong></span>
                    <input
                        type='default'
                        id='direccion_fiscal'
                        value={direccion_fiscal}
                        className='form-control rounded'
                        onChange={(event) => setDireccionFiscal(event.target.value)}
                        style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', padding: 10 / proporcional, 
                                border: edireccion_fiscal ? '1px solid red': '1px solid #007bff'}}
                        placeholder='Dirección de fiscal'/>
                </div>  
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => dispatch(set_datos_paso_factura('cliente'))}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => continuar_datos_productos()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
