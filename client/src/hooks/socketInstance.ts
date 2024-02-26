// socketInstance.js
import { io } from "Socket.IO-client";
import { SERVER_URI } from "../constants";


const socket = io(SERVER_URI, {
  query: {},
});

export default socket;
