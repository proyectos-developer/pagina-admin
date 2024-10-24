import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { gestionproyectosdata } from '../../../../../../redux/slice/gestionproyectosdata'
import { gestionproyectosConstants } from '../../../../../../uri/gestionproyectos-constants'
import axios from 'axios'
import { constantes } from '../../../../../../uri/constantes'

export default function CardTrabajadorTablet ({proporcional, equipo, index}) {

    const dispatch = useDispatch()

    const [trabajador, setTrabajador] = useState({})

    const [over_equipo, setOverequipo] = useState(false)

    useEffect(() => {
        axios.get (`${constantes().url_principal[0].url}/personal/${equipo.id_trabajador}`)
            .then ((res) => {
                setTrabajador(res.data.trabajador)
            }).catch ((err) => {

            })
    }, [])

    return (
        <div key={index} className='' style={{width: '100%', height: 30 / proporcional, marginBottom: 8 / proporcional}}
            onMouseOver={() => setOverequipo(equipo.id)} onMouseLeave={() => setOverequipo('')}
            onClick={() => dispatch(gestionproyectosdata(gestionproyectosConstants(equipo.id_proyecto, equipo.id_trabajador, 0, 0, 0, 0, 0, 0, 16, {}, false).get_trabajador_equipo_proyecto))}>
            <p  style={{lineHeight: `${30 / proporcional}px`, fontSize: 16 / proporcional, color: 'rgb(89, 89, 89)',
                fontFamily: 'Poppins, sans-serif', marginBottom: 0, fontWeight: over_equipo === equipo.id ? 700 : 500, cursor: 'pointer'}}><strong>{index + 1}. </strong>{trabajador.nombres} {trabajador.apellidos}</p>
        </div>
    )
}
