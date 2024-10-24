import React, { useEffect, useRef, useState } from 'react'
import { set_data_personal_sueldo, set_datos_paso_personal, set_error_message } from '../../../../redux/actions/data'
import { useDispatch, useSelector } from 'react-redux'

import check_box from '../../../../assets/iconos/comun/check_box.png'
import box from '../../../../assets/iconos/comun/box.png'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'
import { constantes } from '../../../../uri/constantes'

export default function DatosSueldoCell ({proporcional}) {
    
    const dispatch = useDispatch()

    const selectRefBanco = useRef(null)
    const selectRefAfp = useRef(null)
    const selectRefSeguro = useRef(null)

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
    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const {file_upload_cuarta_categoria} = useSelector(({files_data}) => files_data)
    const {data_personal_personal, data_personal_sueldo} = useSelector(({data_actions}) => data_actions)
    const {new_personal} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_personal_sueldo && data_personal_sueldo.afp){
            setAfp(data_personal_sueldo.afp)
            setSeguro(data_personal_sueldo.seguro)
            setBanco(data_personal_sueldo.banco)
            setSueldoBruto(data_personal_sueldo.sueldo_bruto)
            setSueldoNeto(data_personal_sueldo.sueldo_neto)
            setBonos(data_personal_sueldo.bonos)
            setComisiones(data_personal_sueldo.comisiones)
            setNroCuentaBancaria(data_personal_sueldo.nro_cuenta_bancaria)
            setNroCuentaInterBancaria(data_personal_sueldo.nro_cuenta_interbancaria)
            setSelectCuartaCategoria(data_personal_sueldo.cuarta_categoria)
            setUrlCuartaCategoria(data_personal_sueldo.url_cuarta_categoria)
            if (data_personal_sueldo.url_cuarta_categoria.split(';').length > 0){
                setListaFilesDocumentos(data_personal_sueldo.url_cuarta_categoria.split(';'))
            }
        }else{
            setAfp('')
            setSeguro('')
            setBanco('')
            setSueldoBruto('')
            setSueldoNeto('')
            setBonos('')
            setComisiones('')
            setNroCuentaBancaria('')
            setNroCuentaInterBancaria('')
            setSelectCuartaCategoria(false)
            setUrlCuartaCategoria('')
            setListaFilesDocumentos([])
            selectRefBanco.current === null ? null : selectRefBanco.current.value = '0'
            selectRefAfp.current === null ? null : selectRefBanco.current.value = '0'
            selectRefSeguro.current === null ? null : selectRefBanco.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_personal && new_personal.success === true && new_personal.trabajador){        
            setAfp('')
            setSeguro('')
            setBanco('')
            setSueldoBruto('')
            setSueldoNeto('')
            setBonos('')
            setComisiones('')
            setNroCuentaBancaria('')
            setNroCuentaInterBancaria('')
            selectRefBanco.current !== null ? selectRefBanco.current.value = '0' : null
            selectRefAfp.current !== null ? selectRefAfp.current.value = '0' : null
            selectRefSeguro.current !== null ? selectRefSeguro.current.value = '0' : null
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch (set_error_message(true))
        }
    }, [new_personal])

    useEffect(() => {
        if (file_upload_cuarta_categoria && file_upload_cuarta_categoria.success === true && file_upload_cuarta_categoria.message === true){
            let file = url_cuarta_categoria
            file = file  === '' ? `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_cuarta_categoria.name}` : 
                           file + '; ' + `${constantes().url_archivo[0].url}/personal/documentos/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_cuarta_categoria.name}`
            setListaFilesDocumentos(file.split (';'))
            setUrlCuartaCategoria(`${constantes().url_principal[0].url}/personal/cuarta_categoria/${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}/${file_cuarta_categoria.name}`)
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_cuarta_categoria))
        }else if (file_upload_cuarta_categoria && file_upload_cuarta_categoria.success === false && file_upload_cuarta_categoria.error){
            dispatch (set_error_message(true))
        }
    }, [file_upload_cuarta_categoria])

    const volver_datos_trabajo = () => {
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
        dispatch(set_data_personal_sueldo(data_sueldo))
        dispatch (set_datos_paso_personal('trabajo'))
    }

    const handleFileChange4Categoria = (event) => {
        setFileCuartaCategoria(event.target.files[0])
    }

    const handleUpload4Categoria = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_cuarta_categoria, file_cuarta_categoria.name)
        dispatch(filesdata(filesConstants(`${data_personal_personal.apellidos.replace(' ', '_')}_${data_personal_personal.nombres.replace(' ', '')}`, data, false).file_upload_cuarta_categoria))
    }

    const continuar_datos_evaluaciones = () => {
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
        dispatch(set_data_personal_sueldo(data_sueldo))
        dispatch (set_datos_paso_personal('evaluacion'))
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
                            autoComplete={false}
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
                            autoComplete={false}
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
                            autoComplete={false}
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
                            autoComplete={false}
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
                                onClick={() => setSelectCuartaCategoria(!select_cuarta_categoria)}/>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, color: '#007bff',
                                    fontWeight: 500, marginBottom: 0}}>
                                Suspensión de cuarta categoría
                            </p>
                        </div>
                        {
                            select_cuarta_categoria ? (
                                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                                    <div className='' style={{width: '100%', height: 'auto'}}>
                                        <input
                            autoComplete={false} 
                                            class="form-control" 
                                            type="file" 
                                            id="formFile" 
                                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                                padding: 10 / proporcional, marginBottom: 16 / proporcional}}
                                            onChange={handleFileChange4Categoria}/>
                                        <div className={boton_subir_cuarta_categoria ? 'shadow-lg rounded' : 'rounded'} 
                                            style={{width: '100%', heihgt: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}>
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
                            autoComplete={false}
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
                            autoComplete={false}
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
            <div className='' style={{width: '100%', height: 'auto'}}>
                <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer', marginBottom: 16 / proporcional}}
                    onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                    onClick={() => volver_datos_trabajo()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Volver
                    </p>
                </div>
                <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                    style={{width: '100%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                    onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                    onClick={() => continuar_datos_evaluaciones()}>
                    <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                        fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                        Continuar
                    </p>
                </div>
            </div>
        </div>
    )
}
