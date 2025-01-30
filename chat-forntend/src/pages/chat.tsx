import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import AdvancedSearch from '../components/AdvancedSearch';
import ChatWindow from '../components/ChatWindow';
import GroupList from '../components/GroupList';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <GroupList onSelectGroup={setActiveGroup} />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeGroup ? (
          <>
            <ChatWindow groupId={activeGroup} socket={socket} />
            <button
              onClick={() => setShowAdvancedSearch(true)}
              className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Advanced Search
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a group to start chatting</p>
          </div>
        )}
      </div>

      {/* Advanced Search Modal */}
      {showAdvancedSearch && activeGroup && (
        <AdvancedSearch
          groupId={activeGroup}
          onClose={() => setShowAdvancedSearch(false)}
        />
      )}
    </div>
  );
};

export default ChatPage;