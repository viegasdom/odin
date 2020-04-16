import { createSlice, Dispatch } from '@reduxjs/toolkit';

type Memory = {
  total: number;
  available: number;
  percent: number;
  used: number;
  free: number;
};

type Processes = {
  pid: number;
  username: string;
  name: string;
  status: string;
  cpu_percent: number;
  memory_percent: number;
};

type SocketData = {
  processes: { username: Processes[] };
  memory: Memory;
  swap: Memory;
  cpu: number[];
};

type ProcessesPayload = {
  payload: SocketData;
};

type ProcessesErrorPayload = {
  payload: string;
};

type ProcessesViewState = {
  data: false | SocketData;
  loading: boolean;
  error: false | string;
};

const initialState: ProcessesViewState = {
  data: false,
  loading: false,
  error: false,
};

const systemPreviewSlice = createSlice({
  name: 'systemPreview',
  initialState,
  reducers: {
    websocketConnection(state) {
      state.loading = true;
    },
    websocketConnectionSuccess(state, { payload }: ProcessesPayload) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    websocketConnectionError(state, { payload }: ProcessesErrorPayload) {
      state.error = payload;
    },
  },
});

export const {
  websocketConnection,
  websocketConnectionSuccess,
  websocketConnectionError,
} = systemPreviewSlice.actions;

export const connectWebsocket = (url: string) => (dispatch: Dispatch) => {
  const websocket = new WebSocket(url);
  websocket.onopen = () => {
    dispatch(websocketConnection());
  };
  websocket.onmessage = ({ data }) => {
    dispatch(websocketConnectionSuccess(JSON.parse(data)));
  };
  websocket.onclose = (e) => {
    if (e.code === 1006) {
      dispatch(
        websocketConnectionError('The connection was closed abnormally'),
      );
    }
  };
};

export default systemPreviewSlice.reducer;
