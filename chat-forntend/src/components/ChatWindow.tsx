import { useEffect, useState } from 'react';
import Message from './Message';
import { ChatMessage ,Props} from '@/types/index';

export default function ChatWindow({ groupId, socket }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message: ChatMessage) => {
      setMessages((prev: ChatMessage[]) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', {
        content: newMessage,
        groupId,
        sender: 'currentUserId', // Replace with actual user ID
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}