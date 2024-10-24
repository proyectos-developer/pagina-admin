import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import check_box from '../../../../assets/iconos/comun/check_box.png'
import box from '../../../../assets/iconos/comun/box.png'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'
import { constantes } from '../../../../uri/constantes'
import { useLocation, useNavigate } from 'react-router-dom'
import { set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'

export default function DatosSueldoTablet ({proporcional, personal}) {
    
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefBanco = useRef(null)
    const selectRefAfp = useRef(null)
    const selectRefSeguro = useRef(null)

    const id_personal = location.pathname.split ('/')[6]
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [afp, setAfp] = useState('')
    const [seguro, setSeguro] = useState('')
    const [banco, setBanco] = useState('')
    const [sueldo_bruto, setSueldoBruto] = useState('')
    const [sueldo_neto, setSueldoNeto] = useState('')
    const [bonos, setBonos] = useState('')
    const [comisiones, setComisiones] = useState('')
    const [nro_cuenta_bancaria, setNroCuentaBancaria] = useState('')
    const [nro_cuenta_interbancaria, setNroCuentaInterBancaria] = useState('')

    const [select_cuarta_categoria, setSelectCuartaCategoria] = useState(false)
    const [file_cuarta_categoria, setFileCuartaCategoria] = useState('')
    const [url_cuarta_categoria, setUrlCuartaCategoria] = useState('')
    const [lista_files_documentos, setListaFilesDocumentos] = useState([])

    const [boton_subir_cuarta_categoria, setBotonSubir4Categoria] = useState(false)

    const [boton_editar, setBotonEditar] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)
    const [boton_cancelar, setBotonCancelar] = useState(false)
    const [boton_actualizar, setBotonActualizar] = useState(false)

    const {file_upload_cuarta_categoria} = useSelector(({files_data}) => files_data)
    const {get_personal_sueldo, update_personal_sueldo} = useSelector(({personal_data}) => personal_data)
    const {data_editable} = useSelector(({data_actions}) => data_actions)
    
    const [editar_informacion, setEditarInformacion] = useState(data_editable)

    useEffect(() => {
        if (personal && personal.afp){
            setNombres(personal.nombres)
            setApellidos(personal.nombres)
            setAfp(personal.afp)
            setSeguro(personal.seguro)
            setBanco(personal.banco)
            setSueldoBruto(personal.sueldo_bruto)
            setSueldoNeto(personal.sueldo_neto)
            setBonos(personal.bonos)
            setComisiones(personal.comisiones)
            setNroCuentaBancaria(personal.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(personal.nro_cuenta_interbancaria)
            setUrlCuartaCategoria(personal.url_cuarta_categoria)
            setListaFilesDocumentos(personal.url_cuarta_categoria.split(';'))
            window.scrollTo(0, 0)
        }
    }, [])

    useEffect(() => {
        if (get_personal_sueldo && get_personal_sueldo.success === true && get_personal_sueldo.trabajador){
            setNombres(get_personal_sueldo.trabajador.nombres)
            setApellidos(get_personal_sueldo.trabajador.nombres)
            setAfp(get_personal_sueldo.trabajador.afp)
            setSeguro(get_personal_sueldo.trabajador.seguro)
            setBanco(get_personal_sueldo.trabajador.banco)
            setSueldoBruto(get_personal_sueldo.trabajador.sueldo_bruto)
            setSueldoNeto(get_personal_sueldo.trabajador.sueldo_neto)
            setBonos(get_personal_sueldo.trabajador.bonos)
            setComisiones(get_personal_sueldo.trabajador.comisiones)
            setNroCuentaBancaria(get_personal_sueldo.trabajador.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(get_personal_sueldo.trabajador.nro_cuenta_interbancaria)
            setUrlCuartaCategoria(get_personal_sueldo.trabajador.url_cuarta_categoria)
            setListaFilesDocumentos(get_personal_sueldo.trabajador.url_cuarta_categoria.split(';'))
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(0, 0, 0, 0, 0, 0, 0, 0, {}, true).get_personal_sueldo))
        }else if (get_personal_sueldo && get_personal_sueldo.success === false && get_personal_sueldo.error){
            dispatch (set_error_message(true))
        }
    }, [get_personal_sueldo])

    useEffect(() => {
        if (update_personal_sueldo && update_personal_sueldo.success === true && update_personal_sueldo.trabajador){
            setNombres(update_personal_sueldo.trabajador.nombres)
            setApellidos(update_personal_sueldo.trabajador.nombres)
            setAfp(update_personal_sueldo.trabajador.afp)
            setSeguro(update_personal_sueldo.trabajador.seguro)
            setBanco(update_personal_sueldo.trabajador.banco)
            setSueldoBruto(update_personal_sueldo.trabajador.sueldo_bruto)
            setSueldoNeto(update_personal_sueldo.trabajador.sueldo_neto)
            setBonos(update_personal_sueldo.trabajador.bonos)
            setComisiones(update_personal_sueldo.trabajador.comisiones)
            setNroCuentaBancaria(update_personal_sueldo.trabajador.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(update_personal_sueldo.trabajador.nro_cuenta_interbancaria)
            setUrlCuartaCategoria(update_personal_sueldo.trabajador.url_cuarta_categoria)
            setListaFilesDocumentos(update_personal_sueldo.trabajador.url_cuarta_categoria.split(';'))
            setEditarInformacion(false)
            dispatch(personaldata(personalConstants(personal.id, 0, 0, 0, 0, 0, 0, 0, {}, true).update_personal_sueldo))
        }
    }, [update_personal_sueldo])

    useEffect(() => {
        if (file_upload_cuarta_categoria && file_upload_cuarta_categoria.success === true && file_upload_cuarta_categoria.message === true){
            let file = url_cuarta_categoria
            file = file  === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_cuarta_categoria.name}` : 
                           file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_cuarta_categoria.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlCuartaCategoria(`${constantes().url_principal[0].url}/personal/cuarta_categoria/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_cuarta_categoria.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_cuarta_categoria))
        }
    }, [file_upload_cuarta_categoria])

    const handleFileChange4Categoria = (event) => {
        setFileCuartaCategoria(event.target.files[0])
    }

    const handleUpload4Categoria = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_cuarta_categoria, file_cuarta_categoria.name)
        dispatch(filesdata(filesConstants(`${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}`, data, false).file_upload_cuarta_categoria))
    }

    const actualizar_datos_personales = () => {
        const data_sueldo = {
            afp: afp, 
            seguro: seguro,
            sueldo_bruto: sueldo_bruto,
            sueldo_neto: sueldo_neto,
            bonos: bonos,
            comisiones: comisiones,
            banco: banco,
            nro_cuenta_bancaria: nro_cuenta_bancaria,
            nro_cuenta_interbancaria: nro_cuenta_interbancaria,
            cuarta_categoria: select_cuarta_categoria,
            url_cuarta_categoria: url_cuarta_categoria
        }
        dispatch(personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, data_sueldo, false).update_personal_sueldo))
    }

    const cancelar_actualizacion = () => {
        dispatch (personaldata(personalConstants(id_personal, 0, 0, 0, 0, 0, 0, 0, {}, false).get_personal_sueldo))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>AFP</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='afp'
                            ref={selectRefAfp}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setAfp(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{afp === '' ? 'Seleccionar AFP' : afp}</option>
                            <option value='AFP Habitat'>AFP Habitat</option>
                            <option value='AFP Integra'>AFP Integra</option>
                            <option value='AFP Prima'>AFP Prima</option>
                            <option value='AFP Profuturo'>AFP Profuturo</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Seguro</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='seguro'
                            ref={selectRefSeguro}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setSeguro(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{seguro === '' ? 'Seleccionar Seguro' : seguro}</option>
                            <option value='Seguro Vida'>Seguro Vida</option>
                            <option value='Seguro Rimac'>Seguro Rimac</option>
                            <option value='Seguro Mapfre'>Seguro Mapfre</option>
                            <option value='Seguro La Positiva'>Seguro La Positiva</option>
                        </select>
                    </div>
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Bonos</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='bonos'
                            className='form-control rounded'
                            value={bonos}
                            onChange={(event) => setBonos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Bonos'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Comisiones</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='comisiones'
                            className='form-control rounded'
                            value={comisiones}
                            onChange={(event) => setComisiones(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Comisiones'/>
                    </div>
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Sueldo bruto (S/.)</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='sueldo_bruto'
                            className='form-control rounded'
                            value={sueldo_bruto}
                            onChange={(event) => setSueldoBruto(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Sueldo bruto'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Sueldo neto (S/.)</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='sueldo_neto'
                            className='form-control rounded'
                            value={sueldo_neto}
                            onChange={(event) => setSueldoNeto(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Sueldo neto'/>
                    </div>
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='' 
                        style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                        <div className='d-flex' style={{width: '100%', height: 'auto'}}>
                            <img src={select_cuarta_categoria ? check_box : box} 
                                style={{width: 40 / proporcional, height: 40 / proporcional, padding: 12 /proporcional,
                                        marginRight: 10 / proporcional, cursor: 'pointer'}}
                                onClick={() => editar_informacion ? setSelectCuartaCategoria(!select_cuarta_categoria) : null}/>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, color: '#007bff',
                                    fontWeight: 500, marginBottom: 0}}>
                                Suspensión de cuarta categoría
                            </p>
                        </div>
                        {
                            select_cuarta_categoria ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                                        <input
                                            disabled={!editar_informacion} 
                                            class="form-control" 
                                            type="file" 
                                            id="formFile" 
                                            style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional}}
                                            onChange={handleFileChange4Categoria}/>
                                        <div className={boton_subir_cuarta_categoria ? 'shadow-lg rounded' : 'rounded'} 
                                            style={{width: '30%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                            <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                                lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                                fontWeight: 500, cursor: 'pointer'}} onClick={handleUpload4Categoria}
                                                onMouseOver={() => setBotonSubir4Categoria(true)} onMouseLeave={() => setBotonSubir4Categoria(false)}>Subir archivo</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    {
                        lista_files_documentos && lista_files_documentos.length > 0 ? (
                            lista_files_documentos.map((archivo, index) => {
                                return (
                                    archivo === '' ? (
                                        null
                                    ) : (
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`,
                                            color: '#007bff', fontWeight: 500, fontFamily: 'Poppins, sans-serif',
                                            marginBottom: 16 / proporcional}}><strong>{index + 1}.</strong> {archivo}<br/>
                                        </p>
                                    )
                                )
                            })                            
                        ) : null
                    }
                </div>
                <div className='' 
                    style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Banco</strong></span>
                        <select
                            disabled={!editar_informacion}
                            id='banco'
                            ref={selectRefBanco}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setBanco(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{banco === '' ? 'Seleccionar banco' : banco}</option>
                            <option value='BCP'>BCP</option>
                            <option value='Continental'>Continental</option>
                            <option value='Interbank'>Interbank</option>
                            <option value='Scotiabank'>Scotiabank</option>
                            <option value='Pichincha'>Pichincha</option>
                            <option value='Falabella'>Falabella</option>
                            <option value='Mi Banco'>Mi Banco</option>
                            <option value='BanBif'>BanBif</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro cuenta</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='nro_cuenta_bancaria'
                            value={nro_cuenta_bancaria}
                            className='form-control rounded'
                            onChange={(event) => setNroCuentaBancaria(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nro cuenta'/>
                    </div>
                    <div className='position-relative' style={{width: '100%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro cuenta interbancaria</strong></span>
                        <input
                            disabled={!editar_informacion}
                            type='number'
                            id='nro_cuenta_inerbancaria'
                            value={nro_cuenta_interbancaria}
                            className='form-control rounded'
                            onChange={(event) => setNroCuentaInterBancaria(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Cuenta interbancaria'/>
                    </div>
                </div>
            </div>
            {
                editar_informacion ? (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_cancelar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonCancelar(true)} onMouseLeave={() => setBotonCancelar(false)}
                            onClick={() => cancelar_actualizacion()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Cancelar
                            </p>
                        </div>
                        <div className={boton_actualizar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonActualizar(true)} onMouseLeave={() => setBotonActualizar(false)}
                            onClick={() => actualizar_datos_personales()}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Actualizar
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                        <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                            onClick={() => {navigate ('/panel/rrhh/personal'); dispatch(set_datos_paso_personal('personal'));
                                setEditarInformacion(false)
                            }}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Volver
                            </p>
                        </div>
                        <div VolverlassName={boton_editar ? 'shadow rounded' : 'shadow-sm rounded'} 
                            style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                            onMouseOver={() => setBotonEditar(true)} onMouseLeave={() => setBotonEditar(false)}
                            onClick={() => setEditarInformacion(true)}>
                            <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                                fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                Editar
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
