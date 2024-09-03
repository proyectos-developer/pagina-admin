import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_gestion_proyectos } from '../../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../assets/iconos/comun/edit_v2.png'
import edit_select from '../../../../assets/iconos/comun/edit_v1.png'
import view from '../../../../assets/iconos/comun/view_v2.png'
import view_select from '../../../../assets/iconos/comun/view_v1.png'
import trash from '../../../../assets/iconos/comun/trash_v2.png'
import trash_select from '../../../../assets/iconos/comun/trash_v1.png'

import {gestionproyectosdata} from '../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../uri/gestionproyectos-constants'

export default function CardGestionProyectoTablet ({proporcional, index, gestion_proyecto, view_gestion}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [mouse_edit, setMouseEdit] = useState(false)
    const [mouse_view, setMouseView] = useState(false)
    const [mouse_trash, setMouseTrash] = useState(false)

    const ver_gestion_proyecto = () => {
        dispatch (set_data_gestion_proyectos(gestion_proyecto))
        navigate (`/panel/gestion-proyectos/proyecto/${gestion_proyecto.nombre_proyecto.replace(' ', '-')}/${gestion_proyecto.id}`)
    }

    const eliminar_gestion_proyecto = () => {
        dispatch(gestionproyectosdata(gestionproyectosConstants(gestion_proyecto.id, 0, 0, 0, 0, 0, 0, 0, 16, {}, false).delete_informe_proyecto))
    }

    return (
        <div key={index} style={{width: '100%', height: '100%'}}>
            {
                view_gestion === 'grid' ? (
                    <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%',
                        background: 'rgba(244, 244, 244, 0.6)', border: '1px solid #28a745'}}
                        onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                        <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}>
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                                <div className='rounded-circle' style={{width: '100%', height: 220 / proporcional}}>
                                </div>
                            </div>
                            <div style={{width: '100%', height: 'auto'}}>
                                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Nombre proyecto: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{gestion_proyecto.nombre_proyecto}</span>
                                </h4>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Fecha inicio: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{(new Date(gestion_proyecto.fecha_inicio)).toDateString()}</span>
                                </h6>
                                <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                                    color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                                    Estado: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{gestion_proyecto.estado_proyecto}</span>
                                </h6>
                            </div>
                        </div>
                        {
                            over_card ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 40 / proporcional}}>
                                    <div className='d-flex justify-content-between' style={{width: '60%', height: 'auto'}}>
                                        <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_gestion_proyecto()}
                                                onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>

                                        <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => ver_gestion_proyecto()}
                                                onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>

                                        <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                                padding: 8 / proporcional, cursor: 'pointer'}}
                                                onClick={() => eliminar_gestion_proyecto()}
                                                onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : (
                    <div key={index} className='rounded' style={{width: '100%', height: 80 / proporcional, 
                            background: over_card ? 'rgba(244, 244, 244, 1)' : 'rgba(244, 244, 244, 0.6)', 
                            borderBottom: '1px solid #28a745'}}>
                        <div style={{width: '100%', height: 80 / proporcional, padding: 10 / proporcional, cursor: 'pointer'}}
                            onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}>
                            <div className='d-flex justify-content-between' style={{width: '100%', height: 60 / proporcional}}>
                                <div style={{width: '75%', height: 60 / proporcional }}>
                                    <div className='' style={{width: '100%', height: 40 / proporcional}}>
                                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0 / proporcional, 
                                            color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                            Nombre proyecto: <span style={{color: '#007bff', fontSize: 18 / proporcional}}>{gestion_proyecto.nombre_proyecto}</span>
                                        </h4>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{width: '75%', height: 20 / proporcional }}>
                                        <div className='' style={{width: '58%', height: 20 / proporcional}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Fecha inicio: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{(new Date(gestion_proyecto.fecha_inicio)).toDateString()}</span>
                                            </h6>
                                        </div>
                                        <div className='' style={{width: '38%', height: 20 / proporcional}}>
                                            <h6 style={{fontSize: 14 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0 / proporcional, 
                                                color: 'rgb(89, 89, 89)', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'left'}}>
                                                Estado: <span style={{color: '#007bff', fontSize: 16 / proporcional}}>{gestion_proyecto.estado_proyecto}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end' style={{width: '25%', height: 60 / proporcional,
                                        padding: 10 / proporcional
                                }}>
                                    <img src={mouse_view ? view_select : view} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_gestion_proyecto()}
                                            onMouseOver={() => setMouseView(true)} onMouseLeave={() => setMouseView(false)}/>
                                    <img src={mouse_edit ? edit_select : edit} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => ver_gestion_proyecto()}
                                            onMouseOver={() => setMouseEdit(true)} onMouseLeave={() => setMouseEdit(false)}/>
                                    <img src={mouse_trash ? trash_select : trash} style={{width: 40 / proporcional, height: 40 / proporcional, 
                                            padding: 10 / proporcional, cursor: 'pointer'}}
                                            onClick={() => eliminar_gestion_proyecto()}
                                            onMouseOver={() => setMouseTrash(true)} onMouseLeave={() => setMouseTrash(false)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
