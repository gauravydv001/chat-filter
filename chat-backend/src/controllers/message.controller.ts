import { Request, Response, NextFunction } from 'express';
import Message from '../models/message.model';

export const searchMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      groupId,
      query,
      senderId,
      startDate,
      endDate,
      hasAttachments,
      messageType,
      minLength,
      maxLength,
      containsLinks,
      isRead,
    } = req.query;

    const filter: any = { group: groupId };

    // Apply filters
    if (query) filter.content = { $regex: query, $options: 'i' };
    if (senderId) filter.sender = senderId;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) filter.timestamp.$lte = new Date(endDate as string);
    }
    if (hasAttachments === 'true') filter.attachments = { $exists: true, $ne: [] };
    if (messageType) filter.type = messageType;
    if (minLength) filter.contentLength = { $gte: parseInt(minLength as string) };
    if (maxLength) filter.contentLength = { ...filter.contentLength, $lte: parseInt(maxLength as string) };
    if (containsLinks === 'true') filter.content = { $regex: /https?:\/\/[^\s]+/ };
    if (isRead) filter.readBy = isRead === 'true' ? { $in: [req.user!._id] } : { $nin: [req.user!._id] };

    // Fetch messages
    const messages = await Message.find(filter)
      .populate('sender', 'username avatar')
      .sort({ timestamp: -1 })
      .limit(100);

    // Send response
    res.status(200).json(messages);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};