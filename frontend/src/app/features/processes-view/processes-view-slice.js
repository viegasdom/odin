import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: false,
  loading: false,
  error: false,
};

const processesViewSlice = createSlice({
  name: 'processesView',
  initialState,
  reducers: {
    requestLoading(state) {
      state.loading = true;
    },
    requestSuccess(state, { payload }) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  requestLoading,
  requestSuccess,
  requestError,
} = processesViewSlice.actions;

export const requestProcesses = () => dispatch => {
  dispatch(requestLoading());
  axios
    .get(`http://127.0.0.1:8000/processes/`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch(error => dispatch(requestError(error.response.data)));
};

export default processesViewSlice.reducer;
