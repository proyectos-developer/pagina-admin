import React, { useEffect, useRef } from 'react'

import Chart from 'chart.js/auto'

export default function VentasChartCell ({proporcional}) {
    
    const chartRef = useRef(null)

    const chartOptions = {
        responsive: true,
        scalse: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }

    const chartData = {
        labels: ['Enero-24', 'Febrero-24', 'Marzo-24', 'Abril-24', 'Mayo-24', 'Junio-24', 'Julio-24', 'Agosto-24'],
        datasets: [{
            label: 'Ventas',
            data: [4200, 10600, 11200, 9800, 13200, 8200, 15600, 14800],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    useEffect(() => {
        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: chartData,
            options: chartOptions
        })

        return (() => {
            myChart.destroy()
        })
    }, [chartData, chartOptions])

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <canvas ref={chartRef}/>
        </div>
    )
}