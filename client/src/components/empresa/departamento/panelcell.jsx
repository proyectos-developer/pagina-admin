import React, { useEffect, useState } from 'react'

import NuevoDepartamentoCell from './menu/nuevodepartamentocell.jsx'

import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_data_departamento } from '../../../redux/actions/data.js'

export default function DepartamentosEmpresaPanelCell ({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [boton_cerrar, setBotonCerrar] = useState(false)
    const [boton_corregir, setBotonCorregir] = useState(false)
    const [show_departamento, setShowDepartamento] = useState(false)
    const [departamento, setDepartamento] = useState({})

    const {new_departamento} = useSelector(({departamentos_data}) => departamentos_data)
    
    useEffect(() => { 
        if (new_departamento && new_departamento.success === true && new_departamento.departamento){
            window.scrollTo(0, 0)
            setShowDepartamento(true)
            setDepartamento(new_departamento.departamento)
        }
    }, [new_departamento])

    const cerrar_nuevo_lateral = () => {
        setShowDepartamento(false)
        setDepartamento({})
    }

    const corregir_informaion = () => {
        setDepartamento({})
        window.scrollTo(0,0)
        setShowDepartamento(false)
        dispatch(set_data_departamento(departamento))
        navigate (`/panel/empresa/areas-empresa/area-empresa/${departamento.departamento.replace(' ', '-')}/${departamento.id}`)
    }


    return (
        <div className='position-relative' style={{width: '100%', height: '100%'}}>
            {
                show_departamento ? (
                    <div className='position-fixed end-0 shadow overflow-auto' 
                        style={{width: '80%', height: '90%', background: 'white', zIndex: 9999, top: 80 / proporcional}}>
                        <NuevoDepartamentoCell proporcional={proporcional} departamento={departamento}/>
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