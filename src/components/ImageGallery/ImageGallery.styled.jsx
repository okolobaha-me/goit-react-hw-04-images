import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(4, minmax(320px, 1fr));
  grid-gap: 16px;
  margin: 0 auto 24px auto;
  padding: 0;
  list-style: none;
`;
