import axios, { AxiosError } from 'axios';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

// Type definitions

// Machine Data
export type MachineData = {
  id: string;
  acess_key: string;
  name: string;
  host: string;
  created_at: string;
};

// Machine Request Error
type MachineError = {
  detail: string;
};

// State
type MachineState = {
  data: MachineData[];
  loading: boolean;
  error: false | MachineError;
};

const initialState: MachineState = {
  data: [],
  loading: true,
  error: false,
};

const machineViewSlice = createSlice({
  name: 'machineView',
  initialState,
  reducers: {
    requestGetMachinesSuccess(
      state,
      { payload }: PayloadAction<MachineData[]>,
    ) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    requestCreateMachineSuccess(
      state,
      { payload }: PayloadAction<MachineData>,
    ) {
      state.error = false;
      state.loading = false;
      state.data = [...state.data, payload];
    },
    requestMachineError(state, { payload }: PayloadAction<MachineError>) {
      state.error = payload;
      state.loading = false;
    },
  },
});

const {
  requestGetMachinesSuccess,
  requestCreateMachineSuccess,
  requestMachineError,
} = machineViewSlice.actions;

export const requestMachines = () => (dispatch: Dispatch) => {
  axios
    .get('http://127.0.0.1:5000/machines')
    .then(({ data }: { data: MachineData[] }) =>
      dispatch(requestGetMachinesSuccess(data)),
    )
    .catch((error: AxiosError) =>
      dispatch(requestMachineError(error?.response?.data)),
    );
};

type MachinePostData = {
  accessKey: string;
  name: string;
  host: string;
};

export const createMachine = ({ accessKey, name, host }: MachinePostData) => (
  dispatch: Dispatch,
) => {
  axios
    .post('http://127.0.0.1:5000/machines', {
      access_key: accessKey,
      name,
      host,
    })
    .then(({ data }: { data: MachineData }) =>
      dispatch(requestCreateMachineSuccess(data)),
    )
    .catch((error: AxiosError) => dispatch(error?.response?.data));
};

export default machineViewSlice.reducer;
