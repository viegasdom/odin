import { combineReducers } from '@reduxjs/toolkit';

import systemPreviewReducer from './features/system-preview/system-preview-slice';

const rootReducer = combineReducers({
  systemPreview: systemPreviewReducer,
});

export default rootReducer;
