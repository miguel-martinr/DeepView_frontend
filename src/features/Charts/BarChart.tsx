import React, { useEffect } from 'react'

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, ChartProps } from 'react-chartjs-2';

// Plugins
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';

// Utils
import './styles.css'
import { average } from '../../utils';


interface BarChartProps extends
  Omit<ChartProps<"bar", (number | null)[], unknown>, "type"> {


}


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin,
);

export const BarChart = (props: BarChartProps) => {
  
  return (
    <>
      <Bar
        {...props}
        options={{
          responsive: true,
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
            },
            annotation: {
              annotations: [
                {                  
                  type: 'line',
                  display: true,
                  borderColor: 'black',
                  borderDash: [6, 6],
                  borderDashOffset: 0,
                  borderWidth: 3,
                  label: {
                    enabled: true,
                    content: (ctx) => 'Average: ' + average(ctx).toFixed(2),
                    position: 'end'
                  },
                  scaleID: 'y',
                  value: (ctx) => average(ctx)
                }
              ]
            }
          }
        }}
      />
    </>
  )
}
