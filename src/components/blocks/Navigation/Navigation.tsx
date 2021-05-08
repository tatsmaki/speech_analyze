import React from 'react'
import { Link } from 'react-router-dom'

import { StyledNavigation } from './styles'

const Navigation = () => {
  return (
    <StyledNavigation>
      <Link to="/record">Record</Link>
      <Link to="/recognize">Recognize</Link>
    </StyledNavigation>
  )
}

export { Navigation }
