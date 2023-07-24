import {combineReducers} from 'redux';

import counter from './counter';
import auth from './auth';
import pusdalop from './pusdalop';
import assesment from './asesmen';

export default combineReducers({
  counter,
  auth,
  pusdalop,
  assesment,
});
