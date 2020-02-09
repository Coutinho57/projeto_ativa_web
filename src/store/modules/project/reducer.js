import produce from 'immer';

const INITIAL_STATE = {
  userInProject: [],
};

export default function project(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@project/GET_USER_IN_PROJECT_LIST_SUCCESS': {
        draft.userInProject.splice(0);
        action.payload.forEach(userInProject =>
          draft.userInProject.push(userInProject)
        );
        break;
      }
      default:
    }
  });
}
