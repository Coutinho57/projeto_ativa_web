import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }
  a {
    font-weight: bold;
    color: black;
  }
`;

export const Profile = styled.div``;

export const Button = styled.button`
  margin-left: 20px;
  background: #d44059;
  color: #fff;
  height: 32px;
  width: 64px;
  border: 0;
  border-radius: 4px;
  font-weight: bold;

  transition: background 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${darken(0.06, '#d44059')};
  }
`;
