import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

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
    websocketConnectionSuccess(state, { payload }: PayloadAction<SocketData>) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    websocketCloseSuccess(state) {
      state.error = false;
      state.loading = true;
      state.data = false;
    },
    websocketConnectionError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

export const {
  websocketConnection,
  websocketConnectionSuccess,
  websocketConnectionError,
  websocketCloseSuccess,
} = systemPreviewSlice.actions;

// Socket is defined outside the scope of the thunks this makes it
// easier to handle opening and closing connections across the thunks.
// This also tells us that there's only one socket available on this slice.
let socket: WebSocket | null = null;

export const connectWebsocket = (url: string) => (dispatch: Dispatch) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(url);
  socket.onopen = () => {
    dispatch(websocketConnection());
  };

  socket.onerror = () => {
    dispatch(websocketConnectionError('Failed to connect to ' + url));
  };

  socket.onmessage = ({ data }) => {
    dispatch(websocketConnectionSuccess(JSON.parse(data)));
  };
};

export const closeWebsocket = () => (dispatch: Dispatch) => {
  if (!socket) {
    return;
  }
  socket.close(1000);
  dispatch(websocketCloseSuccess());
};

export default systemPreviewSlice.reducer;
