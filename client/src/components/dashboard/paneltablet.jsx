import React from 'react'
import { useSelector } from 'react-redux'

import MenuSuperiorPanelTablet from './menu/superiorpaneltablet.jsx'

import ProductosVendidosChartTablet from './chart/productosvendidostablet.jsx'
import VentasChartTablet from './chart/ventastablet.jsx'
import ClientesChartTablet from './chart/clientestablet.jsx'
import GananciasChartTablet from './chart/gananciastablet.jsx'
import ProyectosChartTablet from './chart/proyectostablet.jsx'
import ComprasChartTablet from './chart/comprastablet.jsx'

import ProyectosFinalizadosTablet from './datos/proyectosfinalizadostablet.jsx'
import PedidosPorEntregarTablet from './datos/pedidosporentregartablet.jsx'

export default function DashboardPanelTablet ({proporcional}) {

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', background: 'white', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional,
                paddingLeft: 50 / proporcional, paddingRight: 50 / proporcional, background: '#f2f2f2'}}>
            <MenuSuperiorPanelTablet proporcional={proporcional}/>
            <div style={{width: '100%', height: 'auto'}}>
                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <ProyectosFinalizadosTablet proporcional={proporcional}/>
                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto',
                        marginBottom: 16 / proporcional}}>
                    <div className='shadow' style={{width: '60%', height: 'auto', background: 'white', padding: 20 / proporcional}}>
                        <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                            fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                            Productos más vendidos
                        </h4>
                        <ProductosVendidosChartTablet proporcional={proporcional}/>
                    </div>
                </div>

                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Proyectos en ejecución
                    </h4>
                    <ProyectosChartTablet proporcional={proporcional}/>
                </div>
                
                <div className='shadow' style={{width: '100%', height: 'auto', background: 'white', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Ventas
                    </h4>
                    <VentasChartTablet proporcional={proporcional}/>
                </div>

                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <PedidosPorEntregarTablet proporcional={proporcional}/>
                </div>
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Ganancias
                    </h4>
                    <GananciasChartTablet proporcional={proporcional}/>
                </div>
                
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                    marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Compras por la web
                    </h4>
                    <ComprasChartTablet proporcional={proporcional}/>
                </div>
                                
                <div className='shadow' style={{width: '100%', background: 'white', height: 'auto', padding: 20 / proporcional,
                        marginBottom: 16 / proporcional}}>
                    <h4 style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0,
                        fontFamily: 'Poppins, sans-serif', color: '#28A745', fontWeight: 600}}>
                        Clientes web
                    </h4>
                    <ClientesChartTablet proporcional={proporcional}/>
                </div>
            </div>
        </div>
    )
}
