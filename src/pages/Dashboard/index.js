import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { Container, Info, NoMeetups } from './styles';
import api from '../../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function loadProjects() {
      const response = await api.get('listProjects');
      setProjects(response.data);
    }
    loadProjects();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus Projetos</h1>
        <Link to="/registerProject">
          <button type="button">
            <MdAddCircleOutline size={20} />
            Novo projeto
          </button>
        </Link>
      </header>

      {projects.length ? (
        <ul>
          {projects.map(projeto => (
            <Info key={projeto.id}>
              <strong>{projeto.name_project}</strong>
              <span>
                <Link
                  to={`/usersInProject/${projeto.id}/${projeto.name_project}`}
                >
                  <MdChevronRight size={20} />
                </Link>
              </span>
            </Info>
          ))}
        </ul>
      ) : (
        <NoMeetups>Não há projetos cadastrados</NoMeetups>
      )}
    </Container>
  );
}
