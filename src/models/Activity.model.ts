import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  scheduledTime: Date;
  duration: number;
  type: 'exercise' | 'work' | 'rest' | 'social' | 'other';
  intensity?: 'low' | 'medium' | 'high';
  completed: boolean;
  rescheduled?: boolean;
}

const ActivitySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  type: { type: String, enum: ['exercise', 'work', 'rest', 'social', 'other'], required: true },
  intensity: { type: String, enum: ['low', 'medium', 'high'] },
  completed: { type: Boolean, default: false },
  rescheduled: { type: Boolean, default: false }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
