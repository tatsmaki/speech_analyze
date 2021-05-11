import React, { useEffect, useRef } from 'react'
import { inject, observer } from 'mobx-react'

import { StyledHistogram } from './styles'

const Histogram = inject('rootStore')(
  observer(
    (props: any) => {
      const canvasRef = useRef(null)

      const { rootStore, isRecognize } = props
      const { histogram } = rootStore

      useEffect(() => {
        draw()
      }, [histogram])

      const draw = () => {
        const canvas = canvasRef?.current

        if (histogram) {
          canvas.width = histogram.length
          
          const ctx = canvas.getContext('2d')

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          const value = histogram.reduce((acc: number, peak: number, time: number) => {
            const center = canvas.height / 2
            const magnitude = peak / 2

            if (magnitude > 50) {
              acc += peak
              ctx.strokeStyle = '#b53f3f'
            } else {
              ctx.strokeStyle = '#3f51b5'
            }

            ctx.beginPath()
            ctx.moveTo(time, center)
            ctx.lineTo(time, center - magnitude)
            ctx.moveTo(time, center)
            ctx.lineTo(time, center + magnitude)
            ctx.stroke()
            ctx.closePath()

            return acc
          }, 0)
          
          if (isRecognize) {
            rootStore.setValue(value)
          }
        }
      }
    
      return (
        <StyledHistogram>
          <canvas ref={canvasRef} width="300" height="300"></canvas>
        </StyledHistogram>
      )
    }
  )
)

export { Histogram }
