import { combineReducers } from '@reduxjs/toolkit';

import systemViewReducer from './features/system-view/system-view-slice';
import processesViewReducer from './features/processes-view/processes-view-slice';
import processViewReducer from './features/process-view/process-view-slice';

const rootReducer = combineReducers({
  systemPreview: systemViewReducer,
  processesView: processesViewReducer,
  processView: processViewReducer,
});

export default rootReducer;
