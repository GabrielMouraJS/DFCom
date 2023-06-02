import styled from 'styled-components'

export const InputContainer = styled.input`
  width: 100%;
  height: 60px;
  color: #999;
  border: 1px solid var(--color-inputBorder);
  border-radius: 8px !important;
  padding: 0 24px;
  margin-top: 4px;

  .invalid {
    border: 2px solid #e70000;
  }
`
