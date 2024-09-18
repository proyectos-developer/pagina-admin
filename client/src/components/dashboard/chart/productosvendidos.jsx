import React, { useEffect, useRef } from 'react'

import Chart from 'chart.js/auto'

export default function ProductosVendidosChart ({proporcional}) {
    
    const chartRef = useRef(null)

    const chartOptions = {
        responsive: true,
        scalse: {
            x: {
                type: 'pie',
                time: {
                    unit: 'cantidad'
                }
            }
        }
    }

    const chartData = {
        labels: ['Manzana', 'Vino', 'Uvas', 'Plátanos'],
        datasets: [{
            label: 'Productos más vendidos',
            data: [78.60, 560, 56.90, 85.60],
            fill: false,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)'
            ],
            hoverOffset: 4
        }]
    }

    useEffect(() => {
        const myChart = new Chart(chartRef.current, {
            type: 'pie',
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
