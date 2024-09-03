import React from 'react'
import { useSelector } from 'react-redux'

export default function DashboardPanel ({proporcional}) {

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '58%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a', fontWeight: 600}}>
                            Proyectos en ejecución
                        </h4>
                    </div>
                    
                    <div className='shadow' style={{width: '38%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a', fontWeight: 600}}>
                            Ventas
                        </h4>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>                    
                    <div className='shadow' style={{width: '38%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a', fontWeight: 600}}>
                            Clientes web
                        </h4>
                    </div>

                    <div className='shadow' style={{width: '58%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a', fontWeight: 600}}>
                            Compras por la web
                        </h4>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>                    
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a', fontWeight: 600}}>
                            Ganancias
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
