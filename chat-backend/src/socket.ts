import { Server } from 'socket.io';
import http from 'http';
import Message from './models/message.model';

export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
    });

    socket.on('sendMessage', async (message) => {
      try {
        const newMessage = new Message({
          content: message.content,
          sender: message.senderId,
          group: message.groupId,
          readBy: [message.senderId],
        });

        const savedMessage = await newMessage.save();
        const populatedMessage = await Message.populate(savedMessage, {
          path: 'sender',
          select: 'username',
        });

        io.to(message.groupId).emit('newMessage', populatedMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};