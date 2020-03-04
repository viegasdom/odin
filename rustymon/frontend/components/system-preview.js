import React, { useEffect, useState } from 'react';

const SystemPreview = () => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/system');
    ws.onopen = () => {
      console.log('Connected');
    };

    ws.onmessage = event => {
      const response = JSON.parse(event.data);
      console.log(response);
      setPreview(response.data);
    };

    ws.onclose = () => ws.close();
  }, []);

  return <div>{preview}</div>;
};

export default SystemPreview;
