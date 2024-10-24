import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {filesdata} from '../../../../redux/slice/filesdata'
import { filesConstants } from '../../../../uri/files-constants'

import {set_data_personal_estudios, set_data_personal_evaluacion, set_data_personal_personal, set_data_personal_sueldo, set_data_personal_trabajo, set_data_personal_ubicacion, set_datos_paso_personal, set_error_message} from '../../../../redux/actions/data'
import { constantes } from '../../../../uri/constantes'
import { useNavigate } from 'react-router-dom'

export default function DatosPersonalesTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectRefGenero = useRef(null)
    const selectRefTipoDocumento = useRef(null)
    const selectRefEstadoCivil = useRef(null)

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [url_foto, setUrlFoto] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [fecha_nacimiento, setFechaNacimiento] = useState('')
    const [edad, setEdad] = useState(0)
    const [genero, setGenero] = useState('')
    const [estado_civil, setEstadoCivil] = useState('')
    const [nro_hijos, setNroHijos] = useState('')
    const [tipo_documento, setTipoDocumento] = useState('')
    const [nro_documento, setNroDocumento] = useState('')

    const [enombres, setENombres] = useState(false)
    const [eapellidos, setEApellidos] = useState(false)
    const [efecha_nacimiento, setEFechaNacimiento] = useState(false)
    const [etipo_documento, setETipoDocumento] = useState(false)
    const [enro_documento, setENroDocumento] = useState(false)

    const [file_imagen, setFileImagen] = useState('')
    const [boton_subir_foto, setBotonSubirFoto] = useState(false)

    const {file_upload_foto_perfil} = useSelector(({files_data}) => files_data)
    const {data_personal_personal} = useSelector(({data_actions}) => data_actions)
    const {new_personal} = useSelector(({personal_data}) => personal_data)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data_personal_personal && data_personal_personal.tipo_documento){
            setNombres(data_personal_personal.nombres)
            setApellidos(data_personal_personal.apellidos)
            setFechaNacimiento(data_personal_personal.fecha_nacimiento)
            setEdad(data_personal_personal.edad)
            setGenero(data_personal_personal.genero)
            setEstadoCivil(data_personal_personal.estado_civil)
            setNroHijos(data_personal_personal.nro_hijos)
            setTipoDocumento(data_personal_personal.tipo_documento)
            setNroDocumento(data_personal_personal.nro_documento)
            setUrlFoto(data_personal_personal.url_foto)
        }else{
            setNombres('')
            setApellidos('')
            setFechaNacimiento('')
            setEdad(0)
            setGenero('')
            setEstadoCivil('')
            setNroHijos('')
            setTipoDocumento('')
            setNroDocumento('')
            setUrlFoto('')
            selectRefEstadoCivil.current === null ? null : selectRefEstadoCivil.current.value = '0'
            selectRefGenero.current === null ? null : selectRefGenero.current.value = '0'
            selectRefTipoDocumento.current === null ? null : selectRefTipoDocumento.current.value = '0'
        }
    }, [])

    useEffect(() => {
        if (new_personal && new_personal.success === true && new_personal.trabajador){
            setUrlFoto('')
            setNombres('')
            setApellidos('')
            setFechaNacimiento('')
            setEdad('')
            setGenero('')
            setEstadoCivil('')
            setNroHijos('')
            setTipoDocumento('')
            setNroDocumento('')
            selectRefGenero.current !== null ? selectRefGenero.current.value = '0' : null
            selectRefTipoDocumento.current !== null ? selectRefTipoDocumento.current.value = '0' : null
            selectRefEstadoCivil.current !== null ? selectRefEstadoCivil.current.value = '0' : null
        }else if (new_personal && new_personal.success === false && new_personal.error){
            dispatch(set_error_message(true))
        }
    }, [new_personal])

    useEffect(() => {
        if (file_upload_foto_perfil && file_upload_foto_perfil.success === true && file_upload_foto_perfil.message === true){
            setUrlFoto(`${constantes().url_archivo[0].url}/personal/foto_perfil/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_imagen.name}`)
            dispatch (set_data_personal_personal({url_foto: `${constantes().url_archivo[0].url}/personal/foto_perfil/${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}/${file_imagen.name}`}))
            dispatch (filesdata(filesConstants(0, {}, true).file_upload_foto_perfil))
        }else if (file_upload_foto_perfil && file_upload_foto_perfil.success === false && file_upload_foto_perfil.error){
            dispatch(set_error_message(true))
        }
    }, [file_upload_foto_perfil])

    const calcular_edad = () => {
        let hoy = (new Date()).toLocaleDateString().toString()
        const anio_hoy = parseInt(hoy.split('/')[2])
        const anio_nacimiento = parseInt(fecha_nacimiento.split('-')[0])
        const dia_hoy = parseInt(hoy.split('/')[0])
        const dia_nacimiento = parseInt(fecha_nacimiento.split('-')[2])
        const mes_hoy = parseInt(hoy.split('/')[1])
        const mes_nacimiento = parseInt(fecha_nacimiento.split('-')[1])
        if (mes_hoy > mes_nacimiento){
            setEdad(anio_hoy - anio_nacimiento - 1)
        }else if (mes_hoy < mes_nacimiento){
            setEdad(anio_hoy - anio_nacimiento )
        }else{
            if (dia_hoy > dia_nacimiento){
                setEdad(anio_hoy - anio_nacimiento - 1)
            }else{
                setEdad(anio_hoy - anio_nacimiento )
            }
        }
    }
    
    const handleFileChangeFoto = (event) => {
        setFileImagen(event.target.files[0])
    }

    const handleUploadFoto = (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('file', file_imagen, file_imagen.name)
        dispatch(filesdata(filesConstants(`${apellidos.replace(' ', '_')}_${nombres.replace(' ', '')}`, data, false).file_upload_foto_perfil))
    }

    const continuar_datos_ubicacion = () => {
        if (nombres === '' || apellidos === '' || fecha_nacimiento === '' || tipo_documento === '' ||
            nro_documento === ''){
            setENombres(nombres === '' ? true : false)
            setEApellidos(apellidos === '' ? true : false)
            setEFechaNacimiento(fecha_nacimiento === '' ? true : false)
            setETipoDocumento(tipo_documento === '' ? true : false)
            setENroDocumento(nro_documento === '' ? true : false)
        }else{
            setENombres(false)
            setEApellidos(false)
            setEFechaNacimiento(false)
            setETipoDocumento(false)
            setENroDocumento(false)
            dispatch (set_data_personal_personal({
                nombres: nombres,
                apellidos: apellidos,
                fecha_nacimiento: fecha_nacimiento,
                cumpleanios: fecha_nacimiento,
                edad: edad,
                genero: genero,
                estado_civil: estado_civil,
                nro_hijos: nro_hijos,
                tipo_documento: tipo_documento,
                nro_documento: nro_documento,
                url_foto: url_foto
            }))
            dispatch (set_datos_paso_personal('ubicacion'))
        }
    }

    const volver_a_lista = () => {
        dispatch (set_data_personal_personal({}))
        dispatch (set_data_personal_ubicacion({}))
        dispatch (set_data_personal_estudios({}))
        dispatch (set_data_personal_trabajo({}))
        dispatch (set_data_personal_sueldo({}))
        dispatch (set_data_personal_evaluacion({}))
        selectRefGenero.current.value = '0'
        selectRefTipoDocumento.current.value = '0'
        selectRefEstadoCivil.current.value = '0'
        navigate ('/panel/rrhh/personal')
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nombres trabajador</strong></span>
                        <input 
                            autoComplete={false}
                            id='nombres'
                            type='default'
                            className='form-control rounded'
                            value={nombres}
                            onChange={(event) => setNombres(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enombres ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nombres'/>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Apellidos trabajador</strong></span>
                        <input 
                            autoComplete={false}
                            id='apellidos'
                            type='default'
                            className='form-control rounded'
                            value={apellidos}
                            onChange={(event) => setApellidos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: eapellidos ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Apellidos'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='d-flex justify-content-between' 
                        style={{width: '48%', height: 'auto'}}>
                        <div className='position-relative' style={{width: '78%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Fecha nacimiento</strong></span>
                            <input 
                            autoComplete={false}
                                id='fecha_nacimiento'
                                type='date'
                                className='form-control rounded'
                                value={fecha_nacimiento}
                                onChange={(event) => setFechaNacimiento(event.target.value)}
                                onBlur={() => calcular_edad()}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: efecha_nacimiento ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder='Fecha nacimiento'/>
                        </div>
                        <div className='position-relative' style={{width: '20%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                                <span className='position-absolute'  
                                    style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                        background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                        <strong>Edad</strong></span>
                            <input 
                            autoComplete={false}
                                disabled={true}
                                id='edad'
                                type='number'
                                className='form-control rounded'
                                value={edad}
                                onChange={(event) => setEdad(event.target.value)}
                                style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                        fontFamily: 'Poppins, sans-serif', border: efecha_nacimiento ? '1px solid red' : '1px solid #007BFF',
                                        padding: 10 / proporcional}}
                                placeholder=''/>
                        </div>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Género</strong></span>
                        <select
                            id='genero'
                            ref={selectRefGenero}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setGenero(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{genero === '' ? 'Seleccionar genero' : genero}</option>
                            <option value='Hombre'>Hombre</option>
                            <option value='Mujer'>Mujer</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Estado civil</strong></span>
                        <select
                            id='estado_civil'
                            ref={selectRefEstadoCivil}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setEstadoCivil(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{estado_civil === '' ? 'Seleccionar estado civil' : estado_civil}</option>
                            <option value='Soltero'>Soltero</option>
                            <option value='Casado'>Casado</option>
                            <option value='Divorciado'>Divorciado</option>
                            <option value='Viudo'>Viudo</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro hijos</strong></span>
                        <input
                            autoComplete={false}
                            type='number'
                            id='nro_hijos'
                            value={nro_hijos}
                            className='form-control rounded'
                            onChange={(event) => setNroHijos(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Número de hijos'/>
                    </div>
                </div>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Tipo documento</strong></span>
                        <select
                            id='tipo_documento'
                            ref={selectRefTipoDocumento}
                            className='form-select rounded'
                            onChange={(event) => event.target.value !== '0' ? setTipoDocumento(event.target.value) : null}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: etipo_documento ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}>
                            <option value='0'>{tipo_documento === '' ? 'Tipo documento' : tipo_documento}</option>
                            <option value='D.N.I'>D.N.I</option>
                            <option value='Pasaporte'>Pasaporte</option>
                            <option value='C.E'>C.E</option>
                            <option value='Otro'>Otro</option>
                        </select>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: 40 / proporcional, marginBottom: 32 / proporcional}}>
                            <span className='position-absolute'  
                                style={{lineHeight: `${14 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    left: 10 / proporcional, top: -7 / proporcional, fontFamily: 'Poppins, sans-serif', marginBottom: 0,
                                    background: 'white', paddingLeft: 5 / proporcional, paddingRight: 5 / proporcional}}>
                                    <strong>Nro documento</strong></span>
                        <input 
                            autoComplete={false}
                            id='nro_documento'
                            type='number'
                            className='form-control rounded'
                            value={nro_documento}
                            onChange={(event) => setNroDocumento(event.target.value)}
                            style={{width: '100%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: enro_documento ? '1px solid red' : '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                            placeholder='Nro documento'/>
                    </div>
                </div>
                {
                    nombres !== '' && apellidos !== '' ? (
                        <div className='d-flex justify-content-between' 
                            style={{width: '100%', height: 40 / proporcional, marginBottom: 16 / proporcional}}>
                            <input 
                            autoComplete={false}
                                class="form-control" 
                                type="file" 
                                id="formFile" 
                                falue={file_imagen}
                                style={{width: '65%', height: 40 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                    fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                    padding: 10 / proporcional}}
                                onChange={handleFileChangeFoto}/>
                                <div className={boton_subir_foto ? 'shadow-lg rounded' : 'rounded'} 
                                    style={{width: '30%', heihgt: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}>
                                    <p style={{fontSize: 16 / proporcional, color: 'white', fontFamily: 'Poppins, sans,serif',
                                        lineHeight: `${40 / proporcional}px`, marginBottom: 0, textAlign: 'center',
                                        fontWeight: 500, cursor: 'pointer'}} onClick={handleUploadFoto}
                                        onMouseOver={() => setBotonSubirFoto(true)} 
                                        onMouseLeave={() => setBotonSubirFoto(false)}>Subir foto</p>
                                </div>
                        </div>
                    ) : null
                }
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Cancelar
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 40 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_ubicacion()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${40 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Continuar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
