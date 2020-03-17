import { combineReducers } from '@reduxjs/toolkit';

import systemPreviewReducer from './features/system-view/system-view-slice';
import processViewSlice from './features/process-view/process-view-slice';

const rootReducer = combineReducers({
  systemPreview: systemPreviewReducer,
  processView: processViewSlice,
});

export default rootReducer;
