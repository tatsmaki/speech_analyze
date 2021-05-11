import React from 'react'

import { RecordsList } from 'components/blocks/RecordsList/RecordsList'
import { CreateRecord } from 'components/blocks/CreateRecord/CreateRecord'
import { Histogram } from 'components/blocks/Histogram/Histogram'

import { StyledRecordPage } from './styles'

const RecordPage = () => {
  return (
    <StyledRecordPage>
      <RecordsList />
      <CreateRecord />
      <Histogram />
    </StyledRecordPage>
  )
}

export { RecordPage }
