import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { CChartProps } from '@coreui/react-chartjs/dist/CChart'
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import './styles.css'


interface BarChartProps extends
  CChartProps,
  React.RefAttributes<Chart<keyof import("chart.js").ChartTypeRegistry>> {


}

export const BarChart = (props: BarChartProps) => {
  return (
    <>
      <CChartBar
        {...props}
        // className='chart'
        plugins={[zoomPlugin]}
        options={{
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
                threshold: 10,
                
              },
              zoom: {
                wheel: {
                  enabled: true,
                  speed: 0.1,
                  
                },
                drag: {
                  enabled: false,
                  
                },
                pinch: {
                  enabled: false
                },
                mode: 'xy',
              }
            }
          }
        }}
      />
    </>
  )
}
