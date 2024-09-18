import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

export default function SessionPanel ({proporcional}) {

    const navigate = useNavigate()
    
    useEffect(() => {
        if (window.localStorage.getItem('session_id')){
            navigate ('/panel')
        }
    }, [])

    return (
        <div className='poisition-relative'style={{width: '100%', height: '100%', paddingTop: 200 / proporcional, paddingBottom: 200 / proporcional,
            paddingLeft: 200 / proporcional, paddingRight: 200 / proporcional}}>
            <div className='position-absolute top-50 start-0' style={{width: '100%', height: '100%'}}>
                <div className='d-flex justyfi-content-between'  style={{width: '100%', height: '100%'}}>
                    <div className='position-relative' style={{width: '48%', height: '100%'}}>
                        <div className='position-absolute' style={{width: 'auto', height: 'auto', top: '20%'}}>
                            <div style={{width: 'auto', height: 'auto', padding: 50 / proporcional}}>
                                <h1 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 32 / proporcional, fontFamily: 'Merriweather',
                                    color: '#007bff', fontWeight: 600, textAlign: 'center'}}>¿Listo para llevar tu negocio al siguiente nivel? </h1>
                                <h4 style={{fontSize: 24 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                    color: '#4a4a4a', fontWeight: 500, textAlign: 'center'}}>
                                    Nuestro CRM te ofrece todas las herramientas que necesitas para gestionar proyectos, optimizar el inventario, analizar las finanzas y generar reportes personalizados. 
                                    <br/><strong>¡Comienza tu prueba gratuita hoy mismo!"</strong>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '4%', height: '100%', paddingTop: 50 / proporcional,
                            paddingBottom: 20 / proporcional
                    }}>
                        <div style={{width: 4, height: '100%', background: '#4a4a4a'}}/>
                    </div>
                    <div className='position-relative' style={{width: '48%', height: '100%'}}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}