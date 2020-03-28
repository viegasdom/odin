import styled from '@emotion/styled';

export const Button = styled.button`
  background: black;
  color: white;
  font-size: 1rem;
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  transition: 0.3s;

  :first-of-type {
    margin-right: 10px;
  }

  :hover {
    transition: 0.3s;
    background: white;
    color: black;
  }

  :focus {
    transition: 0.3s;
    background: white;
    color: black;
    outline-offset: 3px;
  }

  :disabled {
    background: #d0d0d0;
    color: black;
  }

  :disabled:hover {
    cursor: not-allowed;
  }
`;
