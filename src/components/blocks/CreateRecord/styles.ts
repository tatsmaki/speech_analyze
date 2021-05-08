import styled from 'styled-components'

export const StyledCreateRecord = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
`

type Props = {
  isRecording: boolean
}

export const StyledRecorder = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  box-shadow: 0 0 2px black;

  background: ${({ isRecording }: Props) => isRecording ? '#f5005750' : 'white'};
`

export const StyledInput = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 10px;
  background: none;
`

export const StyledSignal = styled.div`
  width: 100%;
  height: 400px;
  overflow-x: auto;
`
