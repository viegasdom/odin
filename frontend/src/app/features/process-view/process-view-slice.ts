import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

// Process typing
type Process = {
  // Detail should be optional considering only when
  // the kill endpoint is hit we get that property.
  detail?: string;
  // Rest of the properties will always be verified.
  pid: number;
  username: string;
  name: string;
  status: string;
  cpu_percent: number;
  cpu_times: number[];
  memory_percent: number;
  memory_info: number[];
  create_time: number;
  num_threads: number;
  exe: string;
  environ: { [key: string]: string };
};

type ProcessPayload = {
  payload: Process;
};

// Error typing
type ProcessError = {
  detail: string;
};

type ProcessErrorPayload = {
  payload: ProcessError;
};

// State Typing
type ProcessViewState = {
  data: false | Process;
  loading: boolean;
  error: false | ProcessError;
};

const initialState: ProcessViewState = {
  data: false,
  loading: true,
  error: false,
};

const processViewSlice = createSlice({
  name: 'processView',
  initialState,
  reducers: {
    requestSuccess(state, { payload }: ProcessPayload) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestError(state, { payload }: ProcessErrorPayload) {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { requestSuccess, requestError } = processViewSlice.actions;

export const requestProcess = (id: number) => (dispatch: Dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/processes/${id}`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export const killProcess = (id: number) => (dispatch: Dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/processes/${id}/kill`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export default processViewSlice.reducer;
