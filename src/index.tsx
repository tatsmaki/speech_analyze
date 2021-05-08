import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { RootStore } from 'store/root'
import { App } from 'components/App/App'

const store = {
  rootStore: new RootStore()
}

render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
