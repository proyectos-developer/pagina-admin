import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TituloPrincipalTablet ({proporcional, titulo, opcion}) {

    const [numero_subcategorias, setNumeroSubCategorias] = useState(0)
    const [total_mostrando, setTotalMostrando] = useState(0)

    const {get_subcategorias} = useSelector(({subcategorias_data}) => subcategorias_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (get_subcategorias && get_subcategorias.success === true && get_subcategorias.subcategorias){
            setNumeroSubCategorias(get_subcategorias.subcategorias.length)
            setTotalMostrando(get_subcategorias.subcategorias.length)
        }
    }, [get_subcategorias])
    
    return (
        <div style={{width: '100%', height: 60 / proporcional, paddingLeft: open_menu_lateral ? 20 / proporcional : 60 / proporcional,
            paddingRight: open_menu_lateral ? 20 / proporcional : 60 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                color: '#4A4A4A'}}>{titulo}
                <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)'}}>
                    {opcion === 1 ? ` mostrando del 0 al ${total_mostrando} de ${numero_subcategorias}` : ''}
                </span>
            </h2>
        </div>
    )
}
