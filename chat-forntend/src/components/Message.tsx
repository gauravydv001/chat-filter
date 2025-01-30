import { MessageProps } from '@/types/index';

export default function Message({ message }: MessageProps) {
    return (
      <div className="flex items-start space-x-2">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-800">{message.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }