import React from 'react'

import MenuSuperiorPanelCell from './menu/superiorpanelcell.jsx'

import ProductosVendidosChartCell from './chart/productosvendidoscell.jsx'
import VentasChartCell from './chart/ventascell.jsx'
import ClientesChartCell from './chart/clientescell.jsx'
import GananciasChartCell from './chart/gananciascell.jsx'
import ProyectosChartCell from './chart/proyectoscell.jsx'
import ComprasChartCell from './chart/comprascell.jsx'

import ProyectosFinalizadosCell from './datos/proyectosfinalizadoscell.jsx'
import PedidosPorEntregarCell from './datos/pedidosporentregarcell.jsx'

export default function DashboardPanelCell ({proporcional}) {

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', background: 'white', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
                paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, background: '#f2f2f2'}}>
            <MenuSuperiorPanelCell proporcional={proporcional}/>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <ProyectosFinalizadosCell proporcional={proporcional}/>
                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto',
                        marginBottom: 16 / proporcional}}>
                    <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Productos más vendidos
                        </h4>
                        <ProductosVendidosChartCell proporcional={proporcional}/>
                    </div>
                </div>

                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Proyectos en ejecución
                    </h4>
                    <ProyectosChartCell proporcional={proporcional}/>
                </div>
                
                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Ventas
                    </h4>
                    <VentasChartCell proporcional={proporcional}/>
                </div>

                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <PedidosPorEntregarCell proporcional={proporcional}/>
                </div>
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Ganancias
                    </h4>
                    <GananciasChartCell proporcional={proporcional}/>
                </div>
                
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                    marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Compras por la web
                    </h4>
                    <ComprasChartCell proporcional={proporcional}/>
                </div>
                                
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Clientes web
                    </h4>
                    <ClientesChartCell proporcional={proporcional}/>
                </div>
            </div>
        </div>
    )
}
