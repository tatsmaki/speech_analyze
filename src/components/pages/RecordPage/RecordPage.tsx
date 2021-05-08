import React from 'react'

import { RecordsList } from 'components/blocks/RecordsList/RecordsList'
import { CreateRecord } from 'components/blocks/CreateRecord/CreateRecord'

import { StyledRecordPage } from './styles'

const RecordPage = () => {
  return (
    <StyledRecordPage>
      <RecordsList />
      <CreateRecord />
    </StyledRecordPage>
  )
}

export { RecordPage }
