import React, { useEffect, useState } from 'react'

import NuevaAreaEmpresaTablet from './menu/nuevaareaempresatablet.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_areas_empresa } from '../../redux/actions/data.js'

export default function AreasEmpresaPanelTablet ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_area_empresa, setShowAreaEmpresa] = useState(false)
    const [area_empresa, setAreaEmpresa] = useState({})

    const {new_area_empresa} = useSelector(({areasempresa_data}) => areasempresa_data)
    
    useEffect(() => { 
        if (new_area_empresa && new_area_empresa.success === true && new_area_empresa.area_empresa){
            window.scrollTo(0, 0)
            setShowAreaEmpresa(true)
            setAreaEmpresa(new_area_empresa.area_empresa)
        }
    }, [new_area_empresa])

    const cerrar_nuevo_lateral = () => {
        setShowAreaEmpresa(false)
        setAreaEmpresa({})
    }

    const corregir_informaion = () => {
        setAreaEmpresa({})
        window.scrollTo(0,0)
        setShowAreaEmpresa(false)
        dispatch(set_data_areas_empresa(area_empresa))
        navigate (`/panel/areas-empresa/area-empresa/${area_empresa.nombres_area.replace(' ', '-')}/${area_empresa.id}`)
    }

    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_area_empresa ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '60%', height: '92%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevaAreaEmpresaTablet proporcional={proporcional} area_empresa={area_empresa}/>
                        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                            <div className={boton_cerrar ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCerrar(true)} onMouseLeave={() => setBotonCerrar(false)}
                                onClick={() => corregir_informaion()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Corregir información
                                </p>
                            </div>
                            <div className={boton_corregir ? 'shadow rounded' : 'shadow-sm rounded'} 
                                style={{width: '48%', height: 50 / proporcional, background: '#007BFF', cursor: 'pointer'}}
                                onMouseOver={() => setBotonCorregir(true)} onMouseLeave={() => setBotonCorregir(false)}
                                onClick={() => cerrar_nuevo_lateral()}>
                                <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                                    fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                                    Cerrar
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <Outlet/>
        </div>
    )
}
