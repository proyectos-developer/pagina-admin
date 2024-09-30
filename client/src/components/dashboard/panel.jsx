import React from 'react'
import { useSelector } from 'react-redux'

import MenuSuperiorPanel from './menu/superiorpanel.jsx'

import ProductosVendidosChart from './chart/productosvendidos.jsx'
import VentasChart from './chart/ventas.jsx'
import ClientesChart from './chart/clientes.jsx'
import GananciasChart from './chart/ganancias.jsx'
import ProyectosChart from './chart/proyectos.jsx'
import ComprasChart from './chart/compras.jsx'

import ProyectosFinalizados from './datos/proyectosfinalizados.jsx'
import PedidosPorEntregar from './datos/pedidosporentregar.jsx'

export default function DashboardPanel ({proporcional}) {

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', background: 'white', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
                paddingLeft: 50 / proporcional, paddingRight: 50 / proporcional, background: '#f2f2f2'}}>
            <MenuSuperiorPanel proporcional={proporcional}/>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '70%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <ProyectosFinalizados proporcional={proporcional}/>
                    </div>
                    <div className='shadow' style={{width: '28%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Productos más vendidos
                        </h4>
                        <ProductosVendidosChart proporcional={proporcional}/>
                    </div>
                </div>

                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '49%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Proyectos en ejecución
                        </h4>
                        <ProyectosChart proporcional={proporcional}/>
                    </div>
                    
                    <div className='shadow' style={{width: '49%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Ventas
                        </h4>
                        <VentasChart proporcional={proporcional}/>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>                    
                    <div className='shadow' style={{width: '33%', background: 'white', height: 'auto', padding: 20 / proporcional}}>
                        <PedidosPorEntregar proporcional={proporcional}/>
                    </div>
                    <div className='shadow' style={{width: '63%', background: 'white', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Ganancias
                        </h4>
                        <GananciasChart proporcional={proporcional}/>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>    
                    <div className='shadow' style={{width: '49%', background: 'white', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Compras por la web
                        </h4>
                        <ComprasChart proporcional={proporcional}/>
                    </div>
                                    
                    <div className='shadow' style={{width: '49%', background: 'white', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Clientes web
                        </h4>
                        <ClientesChart proporcional={proporcional}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
