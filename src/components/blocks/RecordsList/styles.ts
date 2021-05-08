import styled from 'styled-components'

type Props = {
  isPlaying: boolean
}

export const StyledRecordsList = styled.ol`
  margin: 0;
  padding: 0;
  width: 50vw;
  overflow-y: auto;
`

export const StyledRecord = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding-left: 10px;
  box-shadow: 0 0 2px black;
  list-style-type: none;

  background: ${({isPlaying}: Props) => isPlaying ? '#3f51b550' : 'white'};

  & > span > .key {
    margin-right: 10px;
  }
`
