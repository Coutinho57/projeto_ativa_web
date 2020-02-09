import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import {
  signUpProjectSuccess,
  signUpProjectFailure,
  updateProjectSuccess,
  updateProjectFailure,
  signUpUserInProjectFailure,
  getUsersInProjectListSuccess,
  getUsersInProjectListFailure,
  getUsersInProjectListRequest,
} from './actions';

export function* getUserInProject({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `userInProject/${id}`);

    yield put(getUsersInProjectListSuccess(response.data));
  } catch (err) {
    yield put(getUsersInProjectListFailure());
    toast.error('Erro ao carregar usuários!');
  }
}

export function* signUpUserInProject({ payload }) {
  try {
    const { name, username, password, configuration_id } = payload;

    yield call(api.post, 'users', {
      name,
      username,
      password,
      configuration_id,
    });
    yield put(getUsersInProjectListRequest(configuration_id));
    toast.success('Usuário cadastrado com successo!');
  } catch (err) {
    const message =
      (err && err.response && err.response.data && err.response.data.error) ||
      'Erro ao criar usuário';
    yield put(signUpUserInProjectFailure());
    toast.error(JSON.stringify(message));
  }
}

export function* updateUserInProject({ payload }) {
  try {
    const {
      id,
      name,
      username,
      oldPassword,
      password,
      confirmPassword,
      configuration_id,
    } = payload;
    yield call(api.put, `users/${id}`, {
      id,
      name,
      username,
      oldPassword,
      password,
      confirmPassword,
      configuration_id,
    });
    toast.success('Usuário atualizado com successo!');
    yield put(getUsersInProjectListRequest(configuration_id));
  } catch (err) {
    yield put(updateProjectFailure());
    toast.error('Erro ao atualiar usuário');
  }
}

export function* deleteUserInProject({ payload }) {
  try {
    const { id } = payload;
    const { id_project } = payload;

    yield call(api.delete, `user/${id}`);

    toast.success('Usuário deletado');
    yield put(getUsersInProjectListRequest(id_project));
  } catch (err) {
    toast.error('Erro ao deletar usuário');
  }
}

export function* signUpProject({ payload }) {
  try {
    const { name_project, host, port } = payload;

    const response = yield call(api.post, 'config', {
      name_project,
      host,
      port,
    });

    if (response) {
      toast.success('Projeto cadastrado com sucesso');
      put(signUpProjectSuccess());
    }
    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro ao cadastrar projeto');
    yield put(signUpProjectFailure());
  }
}

export function* updateProject({ payload }) {
  const { id } = payload;
  const { name_project, host, port } = payload;

  try {
    const response = yield call(api.put, `config/${id}`, {
      name_project,
      host,
      port,
    });

    if (response) {
      toast.success('Projeto atualizado com sucesso');
      put(updateProjectSuccess);
      history.push('/dashboard');
    }
  } catch (err) {
    toast.error('Erro ao atualizar projeto, verifique os daods');
    put(updateProjectFailure());
  }
}

export default all([
  takeLatest('@project/GET_USER_IN_PROJECT_LIST_REQUEST', getUserInProject),
  takeLatest('@project/SIGN_UP_USER_IN_PROJECT_REQUEST', signUpUserInProject),
  takeLatest('@project/UPDATE_USER_IN_PROJECT_REQUEST', updateUserInProject),
  takeLatest('@project/DELETE_USER_IN_PROJECT_REQUEST', deleteUserInProject),
  takeLatest('@project/SIGN_UP_PROJECT_REQUEST', signUpProject),
  takeLatest('@project/UPDATE_PROJECT_REQUEST', updateProject),
]);
