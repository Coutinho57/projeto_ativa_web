export function getUsersInProjectListRequest(id) {
  return {
    type: '@project/GET_USER_IN_PROJECT_LIST_REQUEST',
    payload: { id },
  };
}

export function getUsersInProjectListSuccess(usersInProject) {
  return {
    type: '@project/GET_USER_IN_PROJECT_LIST_SUCCESS',
    payload: usersInProject,
  };
}

export function getUsersInProjectListFailure() {
  return {
    type: '@project/GET_USER_IN_PROJECT_LIST_FAILURE',
  };
}

export function signUpUserInProjectRequest(
  name,
  username,
  password,
  configuration_id
) {
  return {
    type: '@project/SIGN_UP_USER_IN_PROJECT_REQUEST',
    payload: { name, username, password, configuration_id },
  };
}

export function signUpUserInProjectSuccess() {
  return {
    type: '@project/SIGN_UP_USER_IN_PROJECT_SUCCESS',
  };
}

export function signUpUserInProjectFailure() {
  return {
    type: '@project/SIGN_UP_USER_IN_PROJECT_FAILURE',
  };
}

export function updateUserInProjectRequest(
  id,
  name,
  username,
  oldPassword,
  password,
  confirmPassword,
  configuration_id
) {
  return {
    type: '@project/UPDATE_USER_IN_PROJECT_REQUEST',
    payload: {
      id,
      name,
      username,
      password,
      oldPassword,
      confirmPassword,
      configuration_id,
    },
  };
}

export function updateUserInProjectSuccess() {
  return {
    type: '@project/UPDATE_USER_IN_PROJECT_SUCCESS',
  };
}

export function updateUserInProjectFailure() {
  return {
    type: '@project/UPDATE_USER_IN_PROJECT_FAILURE',
  };
}

export function deleteUserInProjectRequest(id, id_project) {
  return {
    type: '@project/DELETE_USER_IN_PROJECT_REQUEST',
    payload: { id, id_project },
  };
}
export function deleteUserInProjectSuccess() {
  return {
    type: '@project/DELETE_USER_IN_PROJECT_SUCCESS',
  };
}

export function deleteUserInProjectFailure() {
  return {
    type: '@project/DELETE_USER_IN_PROJECT_FAILURE',
  };
}

export function signUpProjectRequest(name_project, host, port) {
  return {
    type: '@project/SIGN_UP_PROJECT_REQUEST',
    payload: { name_project, host, port },
  };
}

export function signUpProjectSuccess(project) {
  return {
    type: '@project/SIGN_UP_PROJECT_SUCCESS',
    payload: { project },
  };
}

export function signUpProjectFailure() {
  return {
    type: '@project/SIGN_UP_PROJECT_FAILURE',
  };
}

export function updateProjectRequest(id, name_project, host, port) {
  return {
    type: '@project/UPDATE_PROJECT_REQUEST',
    payload: { id, name_project, host, port },
  };
}
export function updateProjectSuccess() {
  return {
    type: '@project/UPDATE_PROJECT_SUCCESS',
  };
}

export function updateProjectFailure() {
  return {
    type: '@project/UPDATE_PROJECT_FAILURE',
  };
}
