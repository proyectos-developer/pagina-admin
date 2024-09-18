import React from 'react'
import { useSelector } from 'react-redux'

import MenuSuperiorPanelCell from './menu/superiorpanelcell.jsx'

import ProductosVendidosChartCell from './chart/productosvendidoscell.jsx'
import VentasChartCell from './chart/ventascell.jsx'
import ClientesChartCell from './chart/clientescell.jsx'
import GananciasChartCell from './chart/gananciascell.jsx'
import ProyectosChartCell from './chart/proyectoscell.jsx'
import ComprasChartCell from './chart/comprascell.jsx'

import ProyectosFinalizadosCell from './datos/proyectosfinalizadoscell.jsx'
import PedidosPorEntregarCell from './datos/pedidosporentregarcell.jsx'

export default function DashboardPanel ({proporcional}) {

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div style={{width: '100%', height: 'auto', paddingLeft: open_menu_lateral ? 20 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <MenuSuperiorPanelCell proporcional={proporcional}/>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto',
                        marginBottom: 32 / proporcional}}>
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                        <ProyectosFinalizadosCell proporcional={proporcional}/>
                    </div>
                </div>
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <PedidosPorEntregarCell proporcional={proporcional}/>
                    </div>
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Productos más vendidos
                        </h4>
                        <ProductosVendidosChartCell proporcional={proporcional}/>
                    </div>

                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Proyectos en ejecución
                        </h4>
                        <ProyectosChartCell proporcional={proporcional}/>
                    </div>
                    
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Ventas
                        </h4>
                        <VentasChartCell proporcional={proporcional}/>
                    </div>
                
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Ganancias
                        </h4>
                        <GananciasChartCell proporcional={proporcional}/>
                    </div>
                
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Compras por la web
                        </h4>
                        <ComprasChartCell proporcional={proporcional}/>
                    </div>
                                    
                    <div className='shadow' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 32 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: 'rgb(75, 192, 192)', fontWeight: 600}}>
                            Clientes web
                        </h4>
                        <ClientesChartCell proporcional={proporcional}/>
                    </div>
            </div>
        </div>
    )
}
