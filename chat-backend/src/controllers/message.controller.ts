import { Request, Response } from 'express';
import Message from '../models/message.model';

export const searchMessages = async (req: Request, res: Response) => {
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

    // Text search
    if (query) {
      filter.content = { $regex: query, $options: 'i' };
    }

    // Sender filter
    if (senderId) {
      filter.sender = senderId;
    }

    // Date range filter
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) filter.timestamp.$lte = new Date(endDate as string);
    }

    // Attachment filter
    if (hasAttachments === 'true') {
      filter.attachments = { $exists: true, $ne: [] };
    }

    // Message type filter
    if (messageType) {
      filter.type = messageType;
    }

    // Message length filter
    if (minLength) {
      filter.contentLength = { $gte: parseInt(minLength as string) };
    }
    if (maxLength) {
      filter.contentLength = filter.contentLength || {};
      filter.contentLength.$lte = parseInt(maxLength as string);
    }

    // Link filter
    if (containsLinks === 'true') {
      filter.content = { $regex: /https?:\/\/[^\s]+/ };
    }

    // Read status filter
    if (isRead) {
      filter.readBy = isRead === 'true' ? { $in: [req.user!._id] } : { $nin: [req.user!._id] };
    }

    // Execute search
    const messages = await Message.find(filter)
      .populate('sender', 'username avatar')
      .sort({ timestamp: -1 })
      .limit(100);

    res.status(200).json(messages);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: 'Search failed', error: errorMessage });
  }
};