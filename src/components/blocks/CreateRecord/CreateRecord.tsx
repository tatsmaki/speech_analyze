import React, { useState, useEffect, useRef } from 'react'
import { inject } from 'mobx-react'
import { FiberManualRecord, Stop } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import { recorder } from 'api/Recorder'
import { RecordedDataType, Record } from 'types'

import { StyledCreateRecord, StyledInput } from './styles'

const CreateRecord = inject('rootStore')(
  (props: any) => {
    const [person, setPerson] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const inputRef = useRef(null)

    const { rootStore, isRecognize } = props
    const { records } = rootStore

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setPerson(value)
    }

    const saveRecord = ({ record, histogram, value }: RecordedDataType) => {
      setPerson((prevState: string) => {
        if (prevState || isRecognize) {
          const newRecord: Record = {
            key: records.length,
            person: prevState,
            voice: record,
            histogram,
            value
          }
    
          if (!isRecognize) {
            rootStore.createRecord(newRecord)
          }
          rootStore.setHistogram(histogram)

          return prevState
        }
      })
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

    const handleKeyDown = (event: any) => {
      switch (event.which) {
        case 32: {
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
          break
        }
        case 13: {
          if (inputRef && inputRef.current === document.activeElement) {
            inputRef.current.blur()
          } else {
            inputRef.current.focus()
          }
          break
        }
        default: {
          break
        }
      }
    }

    return (
      <StyledCreateRecord isRecording={isRecording}>
        <StyledInput
          ref={inputRef}
          placeholder={isRecognize ? 'Compare record' : 'Save record'}
          disabled={isRecognize}
          onChange={handleChange}
        />
        <IconButton color="secondary">
          {isRecording ? <Stop /> : <FiberManualRecord />}
        </IconButton>
      </StyledCreateRecord>
    )
  }
)

export { CreateRecord }
