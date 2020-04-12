import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: false,
  loading: true,
  error: false,
};

const processViewSlice = createSlice({
  name: 'processView',
  initialState,
  reducers: {
    requestSuccess(state, { payload }) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestError(state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { requestSuccess, requestError } = processViewSlice.actions;

export const requestProcess = (id) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/processes/${id}`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export const killProcess = (id) => (dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/processes/${id}/kill`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export default processViewSlice.reducer;
