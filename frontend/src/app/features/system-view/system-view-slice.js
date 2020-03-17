import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    websocketConnectionSuccess(state, { payload }) {
      state.error = false;
      state.loading = false;
      state.data = payload;
    },
    websocketConnectionError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  websocketConnection,
  websocketConnectionSuccess,
  websocketConnectionError,
} = systemPreviewSlice.actions;

export const connectWebsocket = url => dispatch => {
  const websocket = new WebSocket(url);
  websocket.onopen = () => {
    dispatch(websocketConnection());
  };
  websocket.onmessage = ({ data }) => {
    dispatch(websocketConnectionSuccess(JSON.parse(data)));
  };
  websocket.onerror = e => {
    dispatch(websocketConnectionError(JSON.parse(e)));
  };
};

export default systemPreviewSlice.reducer;
