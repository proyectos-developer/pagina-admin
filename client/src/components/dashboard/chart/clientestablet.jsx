import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function ClientesChartCell ({proporcional}) {

    const chartRef = useRef(null)

    const data = {
        labels: ['Enero-24', 'Febrero-24', 'Marzo-24', 'Abril-24', 'Mayo-24', 'Junio-24', 'Julio-24', 'Agosto-24'],
        datasets: [{
            label: 'Número de clientes',
            data: [120, 180, 150, 80, 140, 150, 160, 180],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    }

    useEffect(() => {
        const myChart  = new Chart (chartRef.current, {
            type: 'bar',
            data: data,
            options: {
                scalse: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        return (() => {
            myChart.destroy ()
        })
    }, [])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <canvas ref={chartRef}/>
        </div>
    )
}
