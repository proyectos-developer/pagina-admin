import React from 'react'

export default function NuevaNoticiaCell({proporcional, noticia}) {

    return (
        <div className='' style={{width: '100%', height: 'auto'}}>
            <div className='' style={{width: '100%', height: 'auto', padding: 20 / proporcional,
                background: '#007bff' }}>
                <h2 style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, fontWeight: 600, marginBottom: 0,
                    fontFamily: 'Merriweather', color: 'white'}}>Nueva categoría
                </h2>
            </div>
            <div style={{width: '100%', height: 'auto', padding: 20 / proporcional}}>
                <div className='d-flex justify-content-center rounded-circle' style={{width: '100%', height: 'auto', marginBottom: 16 / proporcional}}>
                    {
                        noticia.url_foto !== '' ? (
                            <img className='rounded-circle' src={noticia.url_foto} 
                                style={{width: 200 / proporcional, height: 200 / proporcional,
                                    border: '1px solid #4a4a4a'}}/>

                        ) : null
                    }
                </div>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Fecha: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {(new Date(noticia.fecha)).toDateString()}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Categoría: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.categoria_noticia}</span>
                </h4>
                <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                    fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Título: 
                    <span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.titulo}</span>
                </h4>
                {
                    noticia.noticia_parrafo_1 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 1: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_1}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_2 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 2: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_2}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_3 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 3: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_3}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_4 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 4: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_4}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_5 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 5: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_5}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_6 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 6: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_6}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_7 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 7: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_7}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_8 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 8: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_8}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_9 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 9: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_9}</span>
                        </h4>
                    ) : null
                }
                {
                    noticia.noticia_parrafo_10 !== '' ? (
                        <h4 style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, fontWeight: 500, marginBottom: 16 / proporcional,
                            fontFamily: 'Poppins, sans-serif', color: '#4a4a4a'}}>Parrafo 10: 
                            <br/><span style={{fontSize: 18 / proporcional, fontWeight: 600, color: '#007bff'}}> {noticia.noticia_parrafo_10}</span>
                        </h4>
                    ) : null
                }
            </div>
        </div>
    )
}
