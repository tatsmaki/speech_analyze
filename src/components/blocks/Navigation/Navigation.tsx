import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { StyledNavigation } from './styles'

const Navigation = withRouter(props => {
  const { location: { pathname } } = props

  return (
    <StyledNavigation>
      <Button color={pathname === '/record' ? 'primary' : 'default'} component={Link} to="/record">
        Record
      </Button>
      <Button color={pathname === '/recognize' ? 'secondary' : 'default'} component={Link} to="/recognize">
        Recognize
      </Button>
    </StyledNavigation>
  )
})

export { Navigation }
