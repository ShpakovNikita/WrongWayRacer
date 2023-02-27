import { io } from 'socket.io-client';
import { envConfig } from '@/configs/env';

const instance = io(envConfig.backendUrl, { transports: ['websocket'] });
export default instance;
