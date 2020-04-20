import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

export type Processes = {
  pid: number;
  username: string;
  name: string;
  status: string;
  cpu_percent: number;
  memory_percent: number;
};

type ProcessesPayload = {
  payload: Processes[];
};

type ProcessesError = {
  detail: string;
};

type ProcessesErrorPayload = {
  payload: ProcessesError;
};

type ProcessesViewState = {
  data: false | Processes[];
  loading: boolean;
  error: false | { detail: string };
};

const initialState: ProcessesViewState = {
  data: false,
  loading: true,
  error: false,
};

type ErrorPayload = {
  payload: { detail: string };
};

type ProcessData = {
  payload: Processes[];
};

const processesViewSlice = createSlice({
  name: 'processesView',
  initialState,
  reducers: {
    requestSuccess(state: ProcessesViewState, { payload }: ProcessesPayload) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestError(state, { payload }: ProcessesErrorPayload) {
      state.error = payload;
      state.loading = false;
    },
    reset(state) {
      state.error = false;
      state.loading = true;
      state.data = false;
    },
  },
});

export const {
  requestSuccess,
  requestError,
  reset,
} = processesViewSlice.actions;

export const requestProcesses = (search: string | undefined) => (
  dispatch: Dispatch,
) => {
  const queryParameters = search ? `?search=${search}` : '';
  dispatch(reset());
  axios
    .get(`http://127.0.0.1:8000/processes/${queryParameters}`)
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export default processesViewSlice.reducer;
