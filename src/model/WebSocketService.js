const socket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');
/**
 * For usage, please view here.
 * @type {{disconnect: WebSocketService.disconnect, addMessageListener: WebSocketService.addMessageListener, removeMessageListener: WebSocketService.removeMessageListener, messageListeners: *[], connect: WebSocketService.connect}}
 */

/*
[in app.js]
import WebSocketService from "model/WebSocketService";

useEffect(() => {
  WebSocketService.connect();
  return () => {
    WebSocketService.disconnect();
  };
}, []);


[in desired component or layout]
import WebSocketService from "model/WebSocketService";

useEffect(() => {
  const handleSignal = (data) => {
    console.log('message:', data);
    if (data === "test_data_1") {
      do something if test_data_1

    } else if (data === "test_data_2") {
      do something if test_data_2
    }
  };

  WebSocketService.addMessageListener(handleSignal);
}, []);
 */
const WebSocketService = {
  connect: () => {
    if (socket.readyState === WebSocket.OPEN) {
      return;
    }

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket closed:', event);
      // Reconnect if the close event wasn't triggered by the disconnect method
      if (event.code !== 1000) {
        console.log('Reconnecting...');
        WebSocketService.connect();
      }
    });
  },

  disconnect: () => {
    if (socket.readyState === WebSocket.CLOSED) {
      return;
    }

    socket.close();
  },

  messageListeners: [],

  addMessageListener: (callback) => {
    socket.addEventListener('message', callback);
    WebSocketService.messageListeners.push(callback);
  },

  removeMessageListener: (callback) => {
    socket.removeEventListener('message', callback);
    WebSocketService.messageListeners = WebSocketService.messageListeners.filter(listener => listener !== callback);
  },
  // Additional methods if needed
};

export default WebSocketService;
