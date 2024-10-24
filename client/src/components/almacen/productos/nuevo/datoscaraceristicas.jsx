import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {set_data_producto_caracteristicas, set_datos_paso_producto} from '../../../../redux/actions/data'

export default function DatosCaracteristicas ({proporcional}) {

    const dispatch = useDispatch()

    const [boton_siguiente, setBotonSiguiente] = useState(false)
    const [boton_volver, setBotonVolver] = useState(false)

    const [caracteristica_1, setCaracteristica1] = useState('') 
    const [caracteristica_2, setCaracteristica2] = useState('') 
    const [caracteristica_3, setCaracteristica3] = useState('') 
    const [caracteristica_4, setCaracteristica4] = useState('') 
    const [caracteristica_5, setCaracteristica5] = useState('') 
    const [caracteristica_6, setCaracteristica6] = useState('') 
    const [caracteristica_7, setCaracteristica7] = useState('') 
    const [caracteristica_8, setCaracteristica8] = useState('') 
    const [caracteristica_9, setCaracteristica9] = useState('') 
    const [caracteristica_10, setCaracteristica10] = useState('') 
    const [caracteristica_11, setCaracteristica11] = useState('') 
    const [caracteristica_12, setCaracteristica12] = useState('') 
    const [caracteristica_13, setCaracteristica13] = useState('')
    const [caracteristica_14, setCaracteristica14] = useState('') 
    const [caracteristica_15, setCaracteristica15] = useState('') 
    const [caracteristica_16, setCaracteristica16] = useState('') 
    const [caracteristica_17, setCaracteristica17] = useState('') 
    const [caracteristica_18, setCaracteristica18] = useState('') 
    const [caracteristica_19, setCaracteristica19] = useState('') 
    const [caracteristica_20, setCaracteristica20] = useState('')
    
    const {data_producto_caracteristicas} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (data_producto_caracteristicas && data_producto_caracteristicas.caracteristicas_1){
            setCaracteristica1(data_producto_caracteristicas.caracteristica_1)
            setCaracteristica2(data_producto_caracteristicas.caracteristica_2)
            setCaracteristica3(data_producto_caracteristicas.caracteristica_3)
            setCaracteristica4(data_producto_caracteristicas.caracteristica_4)
            setCaracteristica5(data_producto_caracteristicas.caracteristica_5)
            setCaracteristica6(data_producto_caracteristicas.caracteristica_6)
            setCaracteristica7(data_producto_caracteristicas.caracteristica_7)
            setCaracteristica8(data_producto_caracteristicas.caracteristica_8)
            setCaracteristica9(data_producto_caracteristicas.caracteristica_9)
            setCaracteristica10(data_producto_caracteristicas.caracteristica_10)
            setCaracteristica11(data_producto_caracteristicas.caracteristica_11)
            setCaracteristica12(data_producto_caracteristicas.caracteristica_12)
            setCaracteristica13(data_producto_caracteristicas.caracteristica_13)
            setCaracteristica14(data_producto_caracteristicas.caracteristica_14)
            setCaracteristica15(data_producto_caracteristicas.caracteristica_15)
            setCaracteristica16(data_producto_caracteristicas.caracteristica_16)
            setCaracteristica17(data_producto_caracteristicas.caracteristica_17)
            setCaracteristica18(data_producto_caracteristicas.caracteristica_18)
            setCaracteristica19(data_producto_caracteristicas.caracteristica_19)
            setCaracteristica20(data_producto_caracteristicas.caracteristica_20)
        }else{
            setCaracteristica1('')
            setCaracteristica2('')
            setCaracteristica3('')
            setCaracteristica4('')
            setCaracteristica5('')
            setCaracteristica6('')
            setCaracteristica7('')
            setCaracteristica8('')
            setCaracteristica9('')
            setCaracteristica10('')
            setCaracteristica11('')
            setCaracteristica12('')
            setCaracteristica13('')
            setCaracteristica14('')
            setCaracteristica15('')
            setCaracteristica16('')
            setCaracteristica17('')
            setCaracteristica18('')
            setCaracteristica19('')
            setCaracteristica20('')
        }
    }, [])

    const continuar_datos_fotos = () => {
        dispatch (set_data_producto_caracteristicas({
            caracteristica_1: caracteristica_1, 
            caracteristica_2: caracteristica_2, 
            caracteristica_3: caracteristica_3, 
            caracteristica_4: caracteristica_4, 
            caracteristica_5: caracteristica_5, 
            caracteristica_6: caracteristica_6, 
            caracteristica_7: caracteristica_7, 
            caracteristica_8: caracteristica_8, 
            caracteristica_9: caracteristica_9, 
            caracteristica_10: caracteristica_10, 
            caracteristica_11: caracteristica_11, 
            caracteristica_12: caracteristica_12, 
            caracteristica_13: caracteristica_13, 
            caracteristica_14: caracteristica_14, 
            caracteristica_15: caracteristica_15, 
            caracteristica_16: caracteristica_16, 
            caracteristica_17: caracteristica_17, 
            caracteristica_18: caracteristica_18, 
            caracteristica_19: caracteristica_19, 
            caracteristica_20: caracteristica_20
        }))
        dispatch (set_datos_paso_producto('caracteristicas'))
    }

    const volver_a_lista = () => {
        dispatch (set_data_producto_caracteristicas({
            caracteristica_1: caracteristica_1, 
            caracteristica_2: caracteristica_2, 
            caracteristica_3: caracteristica_3, 
            caracteristica_4: caracteristica_4, 
            caracteristica_5: caracteristica_5, 
            caracteristica_6: caracteristica_6, 
            caracteristica_7: caracteristica_7, 
            caracteristica_8: caracteristica_8, 
            caracteristica_9: caracteristica_9, 
            caracteristica_10: caracteristica_10, 
            caracteristica_11: caracteristica_11, 
            caracteristica_12: caracteristica_12, 
            caracteristica_13: caracteristica_13, 
            caracteristica_14: caracteristica_14, 
            caracteristica_15: caracteristica_15, 
            caracteristica_16: caracteristica_16, 
            caracteristica_17: caracteristica_17, 
            caracteristica_18: caracteristica_18, 
            caracteristica_19: caracteristica_19, 
            caracteristica_20: caracteristica_20
        }))
        dispatch (set_datos_paso_producto('precios'))
    }

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <div className='' 
                style={{width: '100%', height: 'auto', background: 'white'}}>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_1'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_1}
                        onChange={(event) => setCaracteristica1(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 1'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_1.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_1.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_2'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_2}
                        onChange={(event) => setCaracteristica2(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 2'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_2.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_2.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_3'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_3}
                        onChange={(event) => setCaracteristica3(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 3'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_3.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_3.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_4'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_4}
                        onChange={(event) => setCaracteristica4(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 4'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_4.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_4.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_5'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_5}
                        onChange={(event) => setCaracteristica5(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 5'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_5.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_5.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_6'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_6}
                        onChange={(event) => setCaracteristica6(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 6'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_6.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_6.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_7'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_7}
                        onChange={(event) => setCaracteristica7(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 7'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_7.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_7.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_8'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_8}
                        onChange={(event) => setCaracteristica8(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 8'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_8.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_8.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_9'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_9}
                        onChange={(event) => setCaracteristica9(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 9'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_9.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_9.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_10'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_10}
                        onChange={(event) => setCaracteristica10(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 10'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_10.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_10.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_11'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_11}
                        onChange={(event) => setCaracteristica11(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 11'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_11.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_11.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_12'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_12}
                        onChange={(event) => setCaracteristica12(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 12'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_12.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_12.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_13'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_13}
                        onChange={(event) => setCaracteristica13(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 13'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_13.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_13.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_14'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_14}
                        onChange={(event) => setCaracteristica14(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 14'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_14.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_14.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_15'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_15}
                        onChange={(event) => setCaracteristica15(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 15'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_15.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_15.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_16'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_16}
                        onChange={(event) => setCaracteristica16(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 16'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_16.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_16.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_17'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_17}
                        onChange={(event) => setCaracteristica17(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 17'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_17.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_17.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_18'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_18}
                        onChange={(event) => setCaracteristica18(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 18'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_18.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_18.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_19'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_19}
                        onChange={(event) => setCaracteristica19(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 19'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_19.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_19.length}</p>
                    </div>
                </div>
                <div style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <input 
                        id='caracteristica_20'
                        type='default'
                        className='form-control rounded'
                        value={caracteristica_20}
                        onChange={(event) => setCaracteristica20(event.target.value)}
                        style={{width: '100%', height: 50 / proporcional, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                                fontFamily: 'Poppins, sans-serif', border: '1px solid #007BFF',
                                padding: 10 / proporcional, marginBottom: 5 / proporcional}}
                        placeholder='Característica 20'/>
                    <div className='d-flex justify-content-end' style={{width: '100%', height: 20 / proporcional}}>
                        <p  style={{lineHeight: `${20 / proporcional}px`, fontSize: 14 / proporcional, color: 200 - caracteristica_20.length > 0 ? 'rgb(89, 89, 89)' : 'red',
                            fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: 500, cursor: 'pointer'}}>{200 - caracteristica_20.length}</p>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    <div className={boton_volver ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonVolver(true)} onMouseLeave={() => setBotonVolver(false)}
                        onClick={() => volver_a_lista()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Cancelar
                        </p>
                    </div>
                    <div className={boton_siguiente ? 'shadow rounded' : 'shadow-sm rounded'} 
                        style={{width: '48%', height: 50 / proporcional, background: '#28A745', cursor: 'pointer'}}
                        onMouseOver={() => setBotonSiguiente(true)} onMouseLeave={() => setBotonSiguiente(false)}
                        onClick={() => continuar_datos_fotos()}>
                        <p style={{color: 'white', marginBottom: 0 / proporcional, fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`,
                            fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontWeight: 600}}>
                            Continuar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
