import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: false,
  loading: false,
  error: false,
};

const processViewSlice = createSlice({
  name: 'processView',
  initialState,
  reducers: {
    fetchProcess(state) {
      state.loading = true;
    },
    fetchProcessSuccess(state, { payload }) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    fetchProcessError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  fetchProcess,
  fetchProcessSuccess,
  fetchProcessError,
} = processViewSlice.actions;

export const requestProcess = id => dispatch => {
  fetch(`http://127.0.0.1:8000/processes/${id}`)
    .then(response => {
      dispatch(fetchProcess());
      return response.json();
    })
    .then(data => dispatch(fetchProcessSuccess(data)))
    .catch(error => dispatch(fetchProcessError(error)));
};

export default processViewSlice.reducer;
