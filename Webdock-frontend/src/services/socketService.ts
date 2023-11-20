export const createSocket = async (userId: number) => {
  const socket = new WebSocket(`ws://localhost:8000/ws?userId=${userId}`);
  return socket;
};
