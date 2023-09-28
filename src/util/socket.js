import { io } from 'socket.io-client'

const WS_URL = 'http://localhost:3000' // template-backend

const socket = io(WS_URL, {
  query: {},
  autoConnect: true, // 是否自动连接
  reconnection: true, // 是否自动重新连接
  reconnectionAttempts: 3, // 重新连接尝试次数
  reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
  transports: ['websocket', 'polling']
})

export default socket
