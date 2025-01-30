import { Schema, model, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const groupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model<IGroup>('Group', groupSchema);