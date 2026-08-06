import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../services/socket';

export default function SocketConnection() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit('joinRoom', {
      userId: user.id,
      role: user.role,
    });
  }, [user]);

  return null;
}
