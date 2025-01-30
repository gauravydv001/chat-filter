import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  groups: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: { type: [String], default: [] },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;