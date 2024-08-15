import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TituloPrincipal ({proporcional, titulo, opcion}) {

    const [numero_compras, setNumeroCompras] = useState(0)
    const [total_mostrando, setTotalMostrando] = useState(0)

    const {get_compras} = useSelector(({compras_data}) => compras_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (get_compras && get_compras.success === true && get_compras.compras){
            setNumeroCompras(get_compras.compras.length)
            setTotalMostrando(get_compras.compras.length)
        }
    }, [get_compras])
    
    return (
        <div style={{width: '100%', height: 60 / proporcional, paddingLeft: open_menu_lateral ? 150 / proporcional : 250 / proporcional,
            paddingRight: open_menu_lateral ? 150 / proporcional : 250 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                color: '#4A4A4A'}}>{titulo}
                <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)'}}>
                    {opcion === 1 ? ` mostrando del 0 al ${total_mostrando} de ${numero_compras}` : ''}
                </span>
            </h2>
        </div>
    )
}
