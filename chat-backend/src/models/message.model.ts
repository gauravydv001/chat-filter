import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  sender: Schema.Types.ObjectId;
  group: Schema.Types.ObjectId;
  attachments?: string[];
  readBy: Schema.Types.ObjectId[];
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  attachments: { type: [String], default: [] },
  readBy: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  timestamp: { type: Date, default: Date.now },
});

export default model<IMessage>('Message', messageSchema);