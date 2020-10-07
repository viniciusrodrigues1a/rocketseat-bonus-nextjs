import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5rem;

  p {
    margin: 1rem;
  }

  p + p {
    display: inline-block;
    margin-right: 0;
  }

  a {
    text-decoration: none;
    color: #a5f;

    &:hover {
      text-decoration: underline;
    }
  }
`;
