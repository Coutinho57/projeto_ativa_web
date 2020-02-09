import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-purple.svg';

import { Container, Content, Profile, Button } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Ativa Digital" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Emerson Coutinho</strong>
            </div>
          </Profile>
          <Button onClick={() => {}}>Sair</Button>
        </aside>
      </Content>
    </Container>
  );
}
