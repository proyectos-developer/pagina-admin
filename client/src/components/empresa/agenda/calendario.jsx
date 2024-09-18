import React from 'react'
import { useSelector } from 'react-redux'

export default function CalendarioEmpresa ({proporcional}) {

    const {open_menu_lateral} = useSelector(({data_actions}) => data_actions)

    return (
        <div className='position-relative' style={{width: '100%', minHeight: 720 / proporcional, paddingLeft: open_menu_lateral ? 80 / proporcional : 100 / proporcional,
            paddingRight: open_menu_lateral ? 80 / proporcional : 100 / proporcional, paddingTop: 40 / proporcional, paddingBottom : 40 / proporcional}}>

        </div>
    )
}
