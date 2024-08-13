import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TituloPrincipalTablet ({proporcional, titulo, opcion}) {

    const [numero_clientes, setNumeroClientes] = useState(0)
    const [total_mostrando, setTotalMostrando] = useState(0)

    const {get_clientes} = useSelector(({clientes_data}) => clientes_data)
    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    useEffect(() => {
        if (get_clientes && get_clientes.success === true && get_clientes.clientes){
            setNumeroClientes(get_clientes.clientes.length)
            setTotalMostrando(get_clientes.clientes.length)
        }
    }, [get_clientes])
    
    return (
        <div style={{width: '100%', height: 60 / proporcional, paddingLeft: open_menu_lateral ? 60 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 60 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>
            <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                color: '#4A4A4A'}}>{titulo}
                <span style={{fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)'}}>
                    {opcion === 1 ? ` mostrando del 0 al ${total_mostrando} de ${numero_clientes}` : ''}
                </span>
            </h2>
        </div>
    )
}