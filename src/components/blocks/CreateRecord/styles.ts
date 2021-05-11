import styled from 'styled-components'

type Props = {
  isRecording: boolean
}

export const StyledCreateRecord = styled.div`
  width: calc(50vw - 20px);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  box-shadow: 0 0 2px black;
  margin: 10px;

  background: ${({ isRecording }: Props) => isRecording ? '#f5005750' : 'white'};
`

export const StyledInput = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 10px;
  background: none;
`
