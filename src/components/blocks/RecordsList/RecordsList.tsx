import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { PlayArrow } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import { StyledRecordsList, StyledRecord } from './styles'
import { Record } from 'types'

const RecordsList = inject('rootStore')(
  observer(
    (props: any) => {
      const [isPlaying, setIsPlaying] = useState(null)

      const { rootStore, isRecognize } = props
      const { records, value } = rootStore

      const playRecord = (record: Record) => {
        const audioURL = URL.createObjectURL(record.voice)
        const audio = new Audio(audioURL)

        rootStore.setHistogram(record.histogram)
        setIsPlaying(record.key)
        audio.play()

        audio.onended = () => {
          setIsPlaying(null)
        }
      }

      return (
        <StyledRecordsList>
          {records.map((record: Record) => {
            return <StyledRecord key={record.key} isPlaying={record.key === isPlaying}>
              <span>
                <span className="key">{record.key + 1}</span>
                <span>{record.person}</span>
              </span>
              {isRecognize && (
                <span>
                  {
                    `${
                    (Math.min(value, record.value) / Math.max(value, record.value) * 100).toFixed()
                    }%`
                  }
                </span>
              )}
              <IconButton onClick={() => playRecord(record)} color="primary">
                <PlayArrow />
              </IconButton>
            </StyledRecord>
          })}
        </StyledRecordsList>
      )
    }
  )
)

export { RecordsList }
