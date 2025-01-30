export interface User {
    _id: string;
    username: string;
    password: string;
    groups: string[];
  }
  
  export interface Group {
    _id: string;
    name: string;
    members: string[];
  }
  
  export interface Message {
    _id: string;
    content: string;
    sender: User;
    group: string;
    timestamp: Date;
    readBy: string[];
  }
  export interface AdvancedSearchProps {
    groupId: string;
    onClose: () => void;
  }

  export interface ChatMessage {
    _id: string;
    content: string;
    groupId: string;
    sender: string;
    timestamp: Date;
  }
  
  export interface Props {
    groupId: string;
    socket: any; // Replace 'any' with proper socket type if available
  }
  
  export interface MessageProps {
    message: {
      content: string;
      timestamp: string | number | Date;
    }
  }

  export interface LoginCredentials {
    username: string;
    password: string;
  }