import React from 'react'

export default function TituloPrincipalCell ({proporcional, titulo}) {

    return (
        <div style={{width: '100%', height: 60 / proporcional, padding: 15 / proporcional, paddingLeft: 20 / proporcional, 
                paddingRight: 20 / proporcional}}>
            <h2 style={{fontSize: 28 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 500, marginBottom: 0,
                color: '#4A4A4A'}}>{titulo} <span style={{fontSize: 14 / proporcional, color: 'rgb(89, 89, 89)'}}>mostrando 0 de ...</span></h2>
        </div>
    )
}
