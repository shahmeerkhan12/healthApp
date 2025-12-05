import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  healthGoals?: string[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  height: { type: Number },
  weight: { type: Number },
  healthGoals: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(this.password as string, 10);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
