import styled from 'styled-components'

export const StyledHistogram = styled.div`
  width: calc(100vw - 20px);
  height: 350px;
  overflow-x: auto;
  margin: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`
