import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import MenuSuperiorPanelTablet from '../dashboard/menu/superiorpaneltablet'
import { useSelector } from 'react-redux'

export default function ModuloEmpresaPanelTablet({proporcional}) {

    const navigate = useNavigate()
    const location = useLocation()

    const {data_servicio} = useSelector(({data_actions}) => data_actions)

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
            paddingLeft: 50 / proporcional, paddingRight: 50 / proporcional, background: '#f2f2f2'}}>
            <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                <MenuSuperiorPanelTablet proporcional={proporcional}/>
            </div>
            <div className='d-flex' style={{width: '50%', height: 'auto'}}>
                <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel')}>
                    Inicio 
                </p>
                <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                    / 
                </p>
                <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                        fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                    marginRight: 10 / proporcional}}
                        onClick={() => navigate ('/panel/empresa')}>
                    empresa
                </p>
                {
                    location.pathname.split ('/')[3] !== undefined ? (
                        <div className='d-flex' style={{width: 'auto', height: 'auto'}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                                / 
                            </p>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                                marginRight: 10 / proporcional}}
                                onClick={() => navigate (`/panel/empresa/${location.pathname.split ('/')[3]}`)}>
                                {location.pathname.split ('/')[3]}
                            </p>
                        </div>
                    ) : null
                }
                {
                    location.pathname.split('/')[4] === 'nuevo' ? (
                        <div className='d-flex' style={{width: 'auto', height: 'auto'}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                                / 
                            </p>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                                marginRight: 10 / proporcional}}>
                                nuevo {location.pathname.split('/')[3] === 'servicios' ? 'servicio' : ''}
                            </p>
                        </div>
                    ) : null
                }
                {
                    location.pathname.split('/')[6] !== undefined ? (
                        <div className='d-flex' style={{width: 'auto', height: 'auto'}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', marginRight: 10 / proporcional}}>
                                / 
                            </p>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${30 / proporcional}px`, color: 'rgb(89, 89, 89)',
                                    fontWeight: 500, fontFamily: 'Poppins, sans, serif', cursor: 'pointer',
                                marginRight: 10 / proporcional}}>
                                {data_servicio.servicio} 
                            </p>
                        </div>
                    ) : null
                }
            </div>
            <div className='min-vh-100' style={{width: '100%'}}>
                <Outlet/>
            </div>
        </div>
    )
}
