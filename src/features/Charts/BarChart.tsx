import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { CChartProps } from '@coreui/react-chartjs/dist/CChart'
import Chart from 'chart.js/auto';
import './styles.css'


interface BarChartProps extends
  CChartProps,
  React.RefAttributes<Chart<keyof import("chart.js").ChartTypeRegistry>> {


}

export const BarChart = (props: BarChartProps) => {
  return (
    <CChartBar {...props} className='chart'/>
  )
}
