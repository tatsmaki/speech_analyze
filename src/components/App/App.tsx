import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navigation } from 'components/blocks/Navigation/Navigation'
import { RecordPage } from 'components/pages/RecordPage/RecordPage'
import { RecognizePage } from 'components/pages/RecognizePage/RecognizePage'

import { StyledApp } from './styles'

const App = () => {
  return (
    <>
      <StyledApp />
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/record" component={RecordPage} />
          <Route path="/recognize" component={RecognizePage} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export { App }