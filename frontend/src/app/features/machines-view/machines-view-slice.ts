import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

const initialState = {
  data: false,
  loading: true,
  error: false,
};

const machineViewSlice = createSlice({
  name: 'machineView',
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

const { requestSuccess, requestError } = machineViewSlice.actions;

export const requestMachines = () => (dispatch: Dispatch) => {
  axios
    .get('http://127.0.0.1:5000/machines')
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

type CreateMachineData = {
  accessKey: string;
  name: string;
  host: string;
};

export const createMachine = ({ accessKey, name, host }: CreateMachineData) => (
  dispatch: Dispatch,
) => {
  axios
    .post('http://127.0.0.1:8000/machines', {
      access_key: accessKey,
      name,
      host,
    })
    .then(({ data }) => dispatch(requestSuccess(data)))
    .catch((error) => dispatch(requestError(error.response.data)));
};

export default machineViewSlice.reducer;
