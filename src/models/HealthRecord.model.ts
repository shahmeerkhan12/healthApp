import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  vitals: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    weight?: number;
    temperature?: number;
    sleepHours?: number;
  };
  painLevel?: number;
  painLocation?: string;
  mood?: string;
  energyLevel?: number;
  notes?: string;
}

const HealthRecordSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  vitals: {
    heartRate: { type: Number },
    bloodPressure: {
      systolic: { type: Number },
      diastolic: { type: Number }
    },
    weight: { type: Number },
    temperature: { type: Number },
    sleepHours: { type: Number }
  },
  painLevel: { type: Number, min: 0, max: 10 },
  painLocation: { type: String },
  mood: { type: String },
  energyLevel: { type: Number, min: 0, max: 10 },
  notes: { type: String }
});

export default mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);
