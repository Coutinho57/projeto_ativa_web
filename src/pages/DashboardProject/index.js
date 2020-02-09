import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import { tableIcons } from '../../components/iconsTable';
import {
  signUpUserInProjectRequest,
  updateUserInProjectRequest,
  getUsersInProjectListRequest,
  deleteUserInProjectRequest,
} from '../../store/modules/project/actions';
import { Container } from './styles';
import history from '../../services/history';

export default function DashboardProject({ match }) {
  const { id } = match.params;
  const name = match.params.name_project;
  const dispatch = useDispatch();
  const users = useSelector(state => state.project.userInProject);

  useEffect(() => {
    dispatch(getUsersInProjectListRequest(id));
  }, []); //eslint-disable-line

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
      title: 'Senha',
      field: 'password',
      type: 'string',
    },
  ];

  const add = newData =>
    new Promise((resolve, reject) => {
      if (newData.name && newData.username && newData.password) {
        dispatch(
          signUpUserInProjectRequest(
            newData.name,
            newData.username,
            newData.password,
            id
          )
        );
        resolve();
        return;
      }
      toast.error('Todos os campos devem ser preenchidos');
      reject();
    });

  const update = (newData, oldData) =>
    new Promise((resolve, reject) => {
      if (newData.name && newData.username && newData.password) {
        if (newData.password === oldData.password) {
          const oldPassword = newData.password;
          const { password } = newData;
          const confirmPassword = newData.password;
          dispatch(
            updateUserInProjectRequest(
              newData.id,
              newData.name,
              newData.username,
              oldPassword,
              password,
              confirmPassword,
              id
            )
          );
          resolve();
          return;
        }
        const oldPassword = oldData.password;
        const { password } = newData;
        const confirmPassword = newData.password;
        dispatch(
          updateUserInProjectRequest(
            newData.id,
            newData.name,
            newData.username,
            oldPassword,
            password,
            confirmPassword,
            id
          )
        );
        resolve();
        return;
      }
      toast.error('Todos os campos devem ser preenchidos');
      reject();
    });
  function onDelete(oldData) {
    if (oldData) {
      dispatch(deleteUserInProjectRequest(oldData.id, id));
    }
  }

  return (
    <>
      <Container>
        <MaterialTable
          title={`Projeto ${name}`}
          icons={tableIcons}
          data={users.map(user => {
            const tableData = {
              id: user.User.id,
              name: user.User.name,
              username: user.User.username,
              password: user.User.password,
            };
            return tableData;
          })}
          columns={setColumns}
          editable={{
            onRowAdd: newData => add(newData),
            onRowUpdate: (newData, oldData) => update(newData, oldData),
            onRowDelete: oldData => Promise.resolve(onDelete(oldData)),
          }}
        />
        <button
          type="button"
          className="edit"
          onClick={() => history.push(`/detailProject/${id}`)}
        >
          Editar Projeto
        </button>
      </Container>
    </>
  );
}
