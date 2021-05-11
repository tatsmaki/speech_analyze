import React from 'react'

import { RecordsList } from 'components/blocks/RecordsList/RecordsList'
import { CreateRecord } from 'components/blocks/CreateRecord/CreateRecord'
import { Histogram } from 'components/blocks/Histogram/Histogram'

import { StyledRecognizePage } from './styles'

const RecognizePage = () => {
  return (
    <StyledRecognizePage>
      <RecordsList isRecognize />
      <CreateRecord isRecognize />
      <Histogram isRecognize />
    </StyledRecognizePage>
  )
}

export { RecognizePage }
