// socketInstance.js
import { io } from "socket.io-client";
import { SERVER_URI } from "../constants";


const socket = io(SERVER_URI, {
  query: {},
});

export default socket;
