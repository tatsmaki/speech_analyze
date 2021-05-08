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

      const { rootStore: { records } } = props

      const playRecord = (record: Blob, key: number) => {
        const audioURL = URL.createObjectURL(record)
        const audio = new Audio(audioURL)

        setIsPlaying(key)
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
              <IconButton onClick={() => playRecord(record.voice, record.key)} color="primary">
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
