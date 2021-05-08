import React, { useState, useRef, ChangeEvent } from 'react'
import { inject } from 'mobx-react'
import { FiberManualRecord, Stop } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import { recorder } from 'api/Recorder'
import { RecordedDataType, Record } from 'types'

import { StyledCreateRecord, StyledRecorder, StyledInput, StyledSignal } from './styles'

const CreateRecord = inject('rootStore')(
  (props: any) => {
    const [person, setPerson] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const canvasRef = useRef(null)

    const { rootStore } = props
    const { records } = rootStore

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setPerson(value)
    }

    const saveRecord = ({ record, signal }: RecordedDataType) => {
      if (person) {
        const newRecord: Record = {
          key: records.length,
          person,
          voice: record,
          signal
        }
  
        rootStore.createRecord(newRecord)

        const canvas = canvasRef?.current

        canvas.width = signal.length
        if (canvas.getContext) {
          const ctx = canvas.getContext('2d')

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.beginPath()
          signal.forEach((peak: number, time: number) => {
            ctx.moveTo(time, canvas.height)
            ctx.lineTo(time, canvas.height - peak)
            ctx.stroke()
          })
          ctx.closePath()
        }
      }
    }

    const startRecording = (stream: MediaStream) => {
      recorder.start(stream)
    }

    const stopRecording = () => {
      recorder.stop()
        .then((result: RecordedDataType) => {
          saveRecord(result)
        })
        .catch((error: any) => {
          console.error(error)
        })
    }

    const handleClick = () => {
      setIsRecording((prevState: boolean) => {
        if (prevState) {
          stopRecording()
        } else {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(startRecording)
        }

        return !prevState
      })
    }

    return (
      <StyledCreateRecord>
        <StyledRecorder isRecording={isRecording}>
          <StyledInput onChange={handleChange} placeholder="Enter name"></StyledInput>
          <IconButton onClick={handleClick} color="secondary">
            {isRecording ? <Stop /> : <FiberManualRecord />}
          </IconButton>
        </StyledRecorder>
        <StyledSignal>
          <canvas ref={canvasRef} width="300" height="300"></canvas>
        </StyledSignal>
      </StyledCreateRecord>
    )
  }
)

export { CreateRecord }
