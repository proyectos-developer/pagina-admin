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

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <MenuSuperiorPanel proporcional={proporcional}/>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '70%', height: 'auto', padding: 20 / proporcional}}>
                        <ProyectosFinalizados proporcional={proporcional}/>
                    </div>
                    <div className='shadow' style={{width: '25%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Productos más vendidos
                        </h4>
                        <ProductosVendidosChart proporcional={proporcional}/>
                    </div>
                </div>

                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '48%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Proyectos en ejecución
                        </h4>
                        <ProyectosChart proporcional={proporcional}/>
                    </div>
                    
                    <div className='shadow' style={{width: '48%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Ventas
                        </h4>
                        <VentasChart proporcional={proporcional}/>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>                    
                    <div className='shadow' style={{width: '33%', height: 'auto', padding: 20 / proporcional}}>
                        <PedidosPorEntregar proporcional={proporcional}/>
                    </div>
                    <div className='shadow' style={{width: '63%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Ganancias
                        </h4>
                        <GananciasChart proporcional={proporcional}/>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>    
                    <div className='shadow' style={{width: '48%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Compras por la web
                        </h4>
                        <ComprasChart proporcional={proporcional}/>
                    </div>
                                    
                    <div className='shadow' style={{width: '48%', height: 'auto', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Clientes web
                        </h4>
                        <ClientesChart proporcional={proporcional}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
