import mongoose, { Schema, Document } from 'mongoose';

export interface IDietPlan extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  meals: Array<{
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    time: string;
    foods: Array<{
      name: string;
      quantity: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    }>;
    calories: number;
  }>;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  waterIntake: number;
}

const DietPlanSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  meals: [{
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
    time: { type: String },
    foods: [{
      name: { type: String, required: true },
      quantity: { type: String },
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number }
    }],
    calories: { type: Number }
  }],
  totalCalories: { type: Number },
  macros: {
    protein: { type: Number },
    carbs: { type: Number },
    fats: { type: Number }
  },
  waterIntake: { type: Number }
});

export default mongoose.model<IDietPlan>('DietPlan', DietPlanSchema);
