import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: false,
  loading: true,
  error: false,
};

const processesViewSlice = createSlice({
  name: 'processesView',
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

const {
  requestLoading,
  requestSuccess,
  requestError,
} = processesViewSlice.actions;

export const requestProcesses = (search) => (dispatch) => {
  const queryParameters = search ? `?search=${search}` : '';
  axios
    .get(`http://127.0.0.1:8000/processes/${queryParameters}`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export default processesViewSlice.reducer;
