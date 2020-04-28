import axios, { AxiosError } from 'axios';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

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

// Kill Process
export type KillProcessData = {
  detail: string;
};

// Error typing
type ProcessError = {
  detail: string;
};

// Process view state
type ProcessViewState = {
  processData: false | RequestProcessData;
  processKilled: boolean;
  loading: boolean;
  error: false | ProcessError;
};

const initialState: ProcessViewState = {
  processData: false,
  processKilled: false,
  loading: true,
  error: false,
};

const processViewSlice = createSlice({
  name: 'processView',
  initialState,
  reducers: {
    requestProcessSuccess(
      state,
      { payload }: PayloadAction<RequestProcessData>,
    ) {
      state.error = false;
      state.loading = false;
      state.processData = payload;
    },
    requestProcessError(state, { payload }: PayloadAction<ProcessError>) {
      state.error = payload;
      state.loading = false;
    },
    killProcessSuccess(state) {
      state.error = false;
      state.loading = false;
      state.processKilled = true;
    },
    reset(state) {
      state.error = false;
      state.loading = false;
      state.processKilled = false;
      state.processData = false;
    },
  },
});

const {
  requestProcessSuccess,
  requestProcessError,
  killProcessSuccess,
  reset,
} = processViewSlice.actions;

export const requestProcess = (id: number) => (dispatch: Dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/processes/${id}`)
    .then(({ data }) => dispatch(requestProcessSuccess(data)))
    .catch((error) => dispatch(requestProcessError(error.response.data)));
};

export const killProcess = (id: number) => (dispatch: Dispatch) => {
  console.log('wtf ');
  axios
    .delete(`http://127.0.0.1:8000/processes/${id}`)
    .then(() => dispatch(killProcessSuccess()))
    .catch((error: AxiosError) =>
      dispatch(requestProcessError(error.response?.data)),
    );
};

export const resetProcess = () => (dispatch: Dispatch) => {
  dispatch(reset());
};

export default processViewSlice.reducer;
