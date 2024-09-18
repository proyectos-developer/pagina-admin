import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function ProyectosChart ({proporcional}) {

    const chartRef = useRef(null)

    const data = {
        labels: ['Comfisa', 'Devloper Ideas', 'Scrapping', 'Qhatu', 'Fare', 'Farcon', 'Caral'],
        datasets: [{
            label: '% avance',
            data: [0.9, 0.8, 1, 0.95, 0.6, 0.5, 0.7, 0.75],
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
