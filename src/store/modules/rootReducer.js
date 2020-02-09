import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import project from './project/reducer';

export default combineReducers({ auth, user, project });
