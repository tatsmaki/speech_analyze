import { createGlobalStyle } from 'styled-components'

export const StyledApp = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`