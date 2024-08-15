import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_data_compras } from '../../../redux/actions/data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { constantes } from '../../../uri/constantes'

export default function CardCompraCell ({proporcional, index, compra}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [over_card, setOverCard] = useState(false)
    const [producto, setProducto] = useState({})

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/producto/${compra.id_producto}`)
            .then ((res) => {
                setProducto(res.data.producto)
            }).catch ((err) => {
                
            })
    }, [])

    const ver_compraes = () => {
        dispatch (set_data_compras(compra))
        window.scrollTo(0, 0)
        //navigate (`/panel/compraes/producto/${producto.producto}/${producto.id}`)
    }

    return (
        <div key={index} className={over_card ? 'rounded shadow-lg' : 'rounded shadow'} style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional, cursor: 'pointer'}}
                onMouseOver={() => setOverCard(true)} onMouseLeave={() => setOverCard(false)}
                onClick={() => ver_compraes()}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 32 / proporcional}}>
                    <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional}}>
                        <div className='rounded-circle' style={{width: 150 / proporcional, height: 150 / proporcional,
                                border: '1px solid #4f4f4f'
                        }}/>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto'}}>
                    <h4 style={{fontSize: 20 / proporcional, lineHeight: `${26 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: '#007BFF', fontFamily: 'Merriweather', fontWeight: 600, textAlign: 'center'}}>
                        {producto.producto}
                    </h4>
                    <h6 style={{fontSize: 12 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 16 / proporcional, 
                        color: 'rgb(89, 89, 89)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textAlign: 'left'}}>
                        SKU: {producto.sku}
                    </h6>
                </div>
            </div>
        </div>
    )
}
