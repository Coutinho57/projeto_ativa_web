import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { tableIcons } from '../../components/iconsTable';
import {
  signUpUserInProjectRequest,
  getUsersInProjectListRequest,
} from '../../store/modules/project/actions';
import { Container } from './styles';
import api from '../../services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do usuário é obrigatório'),
  username: Yup.string().required('O username do usuário é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  configuration_id: Yup.string().required(
    'O projeto vinculado à esse usuário é obrigatório'
  ),
});

export default function Project({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const userInProject = useSelector(state => state.project);

  useEffect(() => {
    dispatch(getUsersInProjectListRequest(id));
  }, []) //eslint-disable-line

  const setColumns = [
    {
      title: 'Nome',
      field: 'name',
      type: 'string',
    },
    {
      title: 'Username',
      field: 'username',
      type: 'string',
    },
    {
      title: 'Password',
      field: 'password',
      type: 'string',
    },
    {
      title: 'Projeto',
      field: 'configuration_id',
      type: 'string',
    },
  ];

  const add = newData =>
    new Promise((resolve, reject) => {
      if (newData) {
        resolve();
        return;
      }
      reject();
    });

  const update = (newData, oldData) =>
    new Promise((resolve, reject) => {
      if (newData.workType && newData.description && newData.workMaster) {
        if (oldData) {
          return;
        }
        add(newData);
        resolve();
        return;
      }
      reject();
    });

  function onDelete(oldData) {}

  function handleSubmit({ name, username, password, configuration_id }) {
    if (!id) {
      dispatch(
        signUpUserInProjectRequest(name, username, password, configuration_id)
      );
    }
  }
  return (
    <Container>
      <MaterialTable
        title="teste"
        icons={tableIcons}
        columns={setColumns}
        data={userInProject}
        editable={{
          onRowAdd: newData => add(newData),
          onRowUpdate: (newData, oldData) => update(newData, oldData),
          onRowDelete: oldData => Promise.resolve(onDelete(oldData)),
        }}
      />
      {/* <Form initialData={project || []} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome do usuário" />
        <Input name="username" placeholder="Username" />
        <Input name="password" placeholder="Senha" />
        <Input name="configuration_id" placeholder="Projeto" />
        <button type="submit">
          <MdAddCircleOutline size={20} />
          {id ? 'Editar usuário' : 'Salvar usuário'}
        </button>
      </Form> */}
    </Container>
  );
}
