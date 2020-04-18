import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

// Process typing

// Request Process
export type RequestProcessData = {
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
  deleted: boolean;
};

type RequestProcessPayload = {
  payload: RequestProcessData;
};

// Kill Process
export type KillProcessData = {
  detail: string;
};

type KillProcessPayload = {
  payload: KillProcessData;
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
  data: false | RequestProcessData | KillProcessData;
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
    requestProcessSuccess(state, { payload }: RequestProcessPayload) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestProcessError(state, { payload }: ProcessErrorPayload) {
      state.error = payload;
      state.loading = false;
    },
    killProcessSuccess(state, { payload }: KillProcessPayload) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    clearProcess(state) {
      state.error = false;
      state.loading = false;
      state.data = false;
    },
  },
});

const {
  requestProcessSuccess,
  requestProcessError,
  killProcessSuccess,
  clearProcess,
} = processViewSlice.actions;

export const requestProcess = (id: number) => (dispatch: Dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/processes/${id}`)
    .then(({ data }) => dispatch(requestProcessSuccess(data)))
    .catch((error) => dispatch(requestProcessError(error.response.data)));
};

export const killProcess = (id: number) => (dispatch: Dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/processes/${id}/kill`)
    .then(({ data }) => dispatch(killProcessSuccess(data)))
    .catch((error) => dispatch(requestProcessError(error.response.data)));
};

export const resetProcess = () => (dispatch: Dispatch) => {
  dispatch(clearProcess());
};

export default processViewSlice.reducer;
