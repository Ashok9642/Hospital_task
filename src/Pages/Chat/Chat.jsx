import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import socket from '../../services/socket';
import api from '../../services/api';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatUser, setChatUser] = useState(null);

  const { doctorId, patientId } = useParams();
  const user = useSelector((state) => state.auth.user);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${doctorId}/${patientId}`);

        setMessages(res.data?.data || []);
      } catch (error) {
        console.error('Failed to load messages:', error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId && patientId) {
      fetchMessages();
    }
  }, [doctorId, patientId]);

  // Fetch opposite user's details
  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        if (user?.role === 'doctor') {
          // Doctor is logged in -> fetch patient
          const res = await api.get(`/patients/${patientId}`);
          console.log('aaa', res.data);

          setChatUser(res.data);
        } else {
          // Patient is logged in -> fetch doctor
          const res = await api.get(`/doctors/${doctorId}`);
          setChatUser(res.data?.data);
        }
      } catch (error) {
        console.error('Failed to load chat user:', error.response?.data || error);
      }
    };

    if (doctorId && patientId && user?.role) {
      fetchChatUser();
    }
  }, [doctorId, patientId, user?.role]);

  // Socket chat
  useEffect(() => {
    if (!doctorId || !patientId) return;

    const room = `chat_${doctorId}_${patientId}`;

    socket.emit('join_chat', {
      doctorId,
      patientId,
    });

    console.log('Joining chat room:', room);

    const handleReceiveMessage = (newMessage) => {
      console.log('Received message:', newMessage);

      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg._id === newMessage._id);

        if (alreadyExists) {
          return prev;
        }

        return [...prev, newMessage];
      });

      // Send delivery acknowledgement
      if (newMessage.senderRole !== user?.role) {
        socket.emit('message_delivered', {
          messageId: newMessage._id,
          doctorId,
          patientId,
        });
      }
    };

    const handleStatusUpdate = (status) => {
      console.log('Message status updated:', status);

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === status.messageId
            ? {
                ...msg,
                isDelivered: status.isDelivered,
                isRead: status.isRead,
              }
            : msg,
        ),
      );
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_status_updated', handleStatusUpdate);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_status_updated', handleStatusUpdate);
    };
  }, [doctorId, patientId, user?.role]);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    if (!user?.role) {
      console.log('User role not available');
      return;
    }

    socket.emit('send_message', {
      doctorId,
      patientId,
      senderRole: user.role,
      message: message.trim(),
    });

    setMessage('');
  };

  // Format time
  const formatTime = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get chat user's name
  const chatUserName = chatUser?.userId?.name || chatUser?.name || (user?.role === 'doctor' ? 'Patient' : 'Doctor');

  // Get first letter for avatar
  const avatarLetter = chatUserName?.charAt(0)?.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
              {avatarLetter || '?'}
            </div>

            {/* Name */}
            <div>
              <h2 className="font-semibold text-lg">{chatUserName}</h2>

              <p className="text-sm text-blue-100">{user?.role === 'doctor' ? 'Patient' : 'Doctor'}</p>
            </div>
          </div>

          <div className="text-sm text-blue-100">Secure Chat</div>
        </div>

        {/* Chat Area */}
        <div className="h-[550px] overflow-y-auto bg-slate-50 px-6 py-5">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-gray-500">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl mb-3">
                💬
              </div>

              <p className="font-medium text-gray-600">No messages yet</p>

              <p className="text-sm mt-1">Start the conversation with {chatUserName}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => {
                const isMine = msg.senderRole === user?.role;

                return (
                  <div key={msg._id || index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] px-4 py-3 ${
                        isMine
                          ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border'
                      }`}
                    >
                      {/* Message */}
                      <div className="text-[15px] leading-relaxed">{msg.message}</div>

                      {/* Time + Status */}
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[11px] ${
                          isMine ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        <span>{formatTime(msg.createdAt)}</span>

                        {isMine && (
                          <>
                            {msg.isRead ? (
                              <span className="text-cyan-200 font-bold">✓✓</span>
                            ) : msg.isDelivered ? (
                              <span>✓✓</span>
                            ) : (
                              <span>✓</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t bg-white p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder={`Message ${chatUserName}...`}
              className="flex-1 bg-gray-100 border-0 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
