import React from 'react'

export default function NuevoProducto({proporcional, producto}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nuevo producto
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    <img className='' src={producto.url_foto_principal} 
                        style={{width: 200 / proporcional, height: 200 / proporcional}}/>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto'}}>
                    {
                        producto.url_foto_uno !== '' ? (
                            <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <img className='' src={producto.url_foto_uno} 
                                    style={{width: 100 / proporcional, height: 100 / proporcional}}/>
                            </div>
                        ) : null
                    }
                    {
                        producto.url_foto_dos !== '' ? (
                            <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <img className='' src={producto.url_foto_dos} 
                                    style={{width: 100 / proporcional, height: 100 / proporcional}}/>
                            </div>
                        ) : null
                    }
                    {
                        producto.url_foto_tres !== '' ? (
                            <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <img className='' src={producto.url_foto_tres} 
                                    style={{width: 100 / proporcional, height: 100 / proporcional}}/>
                            </div>
                        ) : null
                    }

                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
                    {
                        producto.url_foto_cuatro !== '' ? (
                            <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <img className='' src={producto.url_foto_cuatro} 
                                    style={{width: 100 / proporcional, height: 100 / proporcional}}/>
                            </div>
                        ) : null
                    }
                    {
                        producto.url_foto_cinco !== '' ? (
                            <div className='d-flex justify-content-center' style={{width: '32%', height: 'auto', marginBottom: 16 / proporcional}}>
                                <img className='' src={producto.url_foto_cinco} 
                                    style={{width: 100 / proporcional, height: 100 / proporcional}}/>
                            </div>
                        ) : null
                    }
                </div>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Producto: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.producto}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Descripción: 
                    <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.descripcion}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Categoría: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.categoria}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Sub categoría: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.sub_categoria}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Unidad: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.unidad}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Servicio: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.servicio}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Precio: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.precio}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Oferta: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.oferta}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Descuento: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {producto.descuento}%</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Precio mensual: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.precio_mensual}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Precio anual: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.precio_anual}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Stock: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.stock}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Código sku: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> S/.{producto.codigo_sku}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Características: 
                    {producto.caracteristica_1 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_1}</span>) : null}
                    {producto.caracteristica_2 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_2}</span>) : null}
                    {producto.caracteristica_3 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_3}</span>) : null}
                    {producto.caracteristica_4 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_4}</span>) : null}
                    {producto.caracteristica_5 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_5}</span>) : null}
                    {producto.caracteristica_6 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_6}</span>) : null}
                    {producto.caracteristica_7 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_7}</span>) : null}
                    {producto.caracteristica_8 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_8}</span>) : null}
                    {producto.caracteristica_9 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_9}</span>) : null}
                    {producto.caracteristica_10 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_10}</span>) : null}
                    {producto.caracteristica_11 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_11}</span>) : null}
                    {producto.caracteristica_12 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_12}</span>) : null}
                    {producto.caracteristica_13 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_13}</span>) : null}
                    {producto.caracteristica_14 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_14}</span>) : null}
                    {producto.caracteristica_15 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_15}</span>) : null}
                    {producto.caracteristica_16 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_16}</span>) : null}
                    {producto.caracteristica_17 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_17}</span>) : null}
                    {producto.caracteristica_18 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_18}</span>) : null}
                    {producto.caracteristica_19 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_19}</span>) : null}
                    {producto.caracteristica_20 !== '' ? (<span style={{marginLeft: 10 / proporcional, fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}><br/>{producto.caracteristica_20}</span>) : null}
                </h4>
            </div>
        </div>
    )
}
