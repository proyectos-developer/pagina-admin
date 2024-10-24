import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_confirmacion_eliminacion, set_data_editable, set_data_gestion_informacion} from '../../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../../assets/iconos/comun/edit_v2.png'
import edit_select from '../../../../../assets/iconos/comun/edit_v1.png'
import view from '../../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../../assets/iconos/comun/view_v1.png'
import trash from '../../../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../../../assets/iconos/comun/trash_v1.png'

import {gestionproyectosdata} from '../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../uri/gestionproyectos-constants'

export default function CardProyecto ({proporcional, index, proyecto}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_edit, setMouseEdit] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    const {confirmacion_eliminacion} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (confirmacion_eliminacion.confirmacion){
            dispatch (set_confirmacion_eliminacion({show: false, mensaje: '', confirmacion: false, id: 0}))
            dispatch(gestionproyectosdata(gestionproyectosConstants(confirmacion_eliminacion.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_gestion_proyecto))
        }
    }, [confirmacion_eliminacion.confirmacion])

    const ver_proyecto = () => {
        dispatch (set_data_editable(false))
        ir_navegacion_proyecto()
    }

    const editar_proyecto = () => {
        dispatch (set_data_editable(true))
        ir_navegacion_proyecto()
    }

    const ir_navegacion_proyecto = () => {
        dispatch (set_data_gestion_informacion(proyecto))
        navigate (`/panel/proyectos/gestion-proyectos/proyecto/${proyecto.nombre_proyecto}/${proyecto.id}`)
    }

    const eliminar_proyecto = () => {
        dispatch (set_confirmacion_eliminacion({show: true, confirmacion: false, mensaje: '¿Seguro que desea eliminar el proyecto?', id: proyecto.id}))
    }

    return (
        <div key={index} className='rounded' style={{width: '100%', height: 'auto', 
                background: over_card ? 'rgba(244, 244, 244, 1)' : 'white', 
                borderBottom: '1px solid rgb(74, 74, 74, 0.5)'}}>
            <div style={{width: '100%', height: 'auto', padding: 5 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 30 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '70%', height: 30 / proporcional}}>
                        <div className='' style={{width: '45%', height: 30 / proporcional}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{proyecto.nombre_proyecto}</span>
                            </p>
                        </div>
                        <div className='' style={{width: '20%', height: 30 / proporcional}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{proyecto.fecha_inicio}</span>
                            </p>
                        </div>
                        <div className='' style={{width: '25%', height: 30 / proporcional}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{proyecto.estado_proyecto}</span>
                            </p>
                        </div>
                        <div className='' style={{width: '10%', height: 30 / proporcional}}>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0 / proporcional, 
                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{proyecto.prioridad}</span>
                            </p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end' style={{width: '30%', height: 30 / proporcional}}>
                        <div className='d-flex justify-content-center' style={{width: '33%', height: 30 / proporcional}}>
                            <img src={mouse_view ? view_select : view} style={{width: 30 / proporcional, height: 30 / proporcional, 
                                    padding: 7 / proporcional, cursor: 'pointer'}}
                                    onClick={() => ver_proyecto()}
                                    onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '33%', height: 30 / proporcional}}>
                            <img src={mouse_edit ? edit_select : edit} style={{width: 30 / proporcional, height: 30 / proporcional, 
                                    padding: 7 / proporcional, cursor: 'pointer'}}
                                    onClick={() => editar_proyecto()}
                                    onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>
                        </div>
                        <div className='d-flex justify-content-center' style={{width: '33%', height: 30 / proporcional}}>
                            <img src={mouse_trash ? trash_select : trash} style={{width: 30 / proporcional, height: 30 / proporcional, 
                                    padding: 7 / proporcional, cursor: 'pointer'}}
                                    onClick={() => eliminar_proyecto()}
                                    onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
