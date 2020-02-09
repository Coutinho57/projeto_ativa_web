import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import {
  signUpProjectRequest,
  updateProjectRequest,
} from '../../store/modules/project/actions';
import { Container } from './styles';
import api from '../../services/api';

const schema = Yup.object().shape({
  name_project: Yup.string().required('O nome do projeto é obrigatório'),
  host: Yup.string().required('O host é obrigatório'),
  port: Yup.string().required('A porta é obrigatório'),
});

export default function Project({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const [project, setProject] = useState([]);
  useEffect(() => {
    async function loadProjects() {
      const response = await api.get(`detailProject/${id}`);
      setProject(response.data);
    }
    loadProjects();
  }, []); //eslint-disable-line

  function handleSubmit({ name_project, host, port }) {
    if (!id) {
      dispatch(signUpProjectRequest(name_project, host, port));
    } else {
      dispatch(updateProjectRequest(id, name_project, host, port));
    }
  }
  return (
    <Container>
      <Form initialData={project || []} schema={schema} onSubmit={handleSubmit}>
        <Input name="name_project" placeholder="Nome do projeto" />
        <Input name="host" placeholder="Host" />
        <Input name="port" type="number" placeholder="Porta" />
        <button type="submit">
          <MdAddCircleOutline size={20} />
          {id ? 'Editar projeto' : 'Salvar projeto'}
        </button>
      </Form>
    </Container>
  );
}
