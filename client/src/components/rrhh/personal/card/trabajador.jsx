import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_editable, set_data_personal } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../assets/iconos/comun/edit_v2.png'
import edit_select from '../../../../assets/iconos/comun/edit_v1.png'
import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import trash from '../../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../../assets/iconos/comun/trash_v1.png'

import {personaldata} from '../../../../redux/slice/personaldata'
import { personalConstants } from '../../../../uri/personal-constants'

export default function CardTrabajador ({proporcional, index, trabajador}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_edit, setMouseEdit] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    const ver_trabajador = () => {
        dispatch (set_data_editable(false))
        ir_navegacion_trabajador()
    }

    const editar_trabajador = () => {
        dispatch (set_data_editable(true))
        ir_navegacion_trabajador()
    }

    const ir_navegacion_trabajador = () => {
        dispatch (set_data_personal(trabajador))
        navigate (`/panel/rrhh/personal/trabajador/${trabajador.nombres.replace(' ', '-')}/${trabajador.id}`)
    }

    const eliminar_trabajador = () => {
        dispatch(personaldata(personalConstants(trabajador.id, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_personal))
    }

    return (
        <div key={index} className='rounded' style={{width: '100%', height: '100%', 
                background: over_card ? 'rgba(244, 244, 244, 1)' : 'white', 
                borderBottom: '1px solid rgb(74, 74, 74, 0.5)'}}>
            <div style={{width: '100%', height: 'auto', padding: 10 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 40 / proporcional}}>
                    <div className='' style={{width: '15%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                            <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{trabajador.nombres.slice(0, 1)}. {trabajador.apellidos}</span>
                        </h4>
                    </div>
                    <div className='' style={{width: '20%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                            <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{trabajador.departamento}</span>
                        </h4>
                    </div>
                    <div className='' style={{width: '15%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                            <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{trabajador.cargo}</span>
                        </h4>
                    </div>
                    <div className='' style={{width: '10%', height: 40 / proporcional}}>
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                            <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{trabajador.estado_trabajo}</span>
                        </h4>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '40%', height: 40 / proporcional}}>
                        <div className='d-flex justify-content-center' style={{width: '13.3%', height: 30 / proporcional}}>
                            <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                    padding: 10 / proporcional, cursor: 'pointer'}}
                                    onClick={() => ver_trabajador()}
                                    onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '13.3%', height: 30 / proporcional}}>
                            <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                    padding: 10 / proporcional, cursor: 'pointer'}}
                                    onClick={() => editar_trabajador()}
                                    onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '13.3%', height: 30 / proporcional}}>
                            <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                    padding: 10 / proporcional, cursor: 'pointer'}}
                                    onClick={() => eliminar_trabajador()}
                                    onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
