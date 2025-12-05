export interface DietPlan {
  userId: string;
  date: Date;
  meals: Meal[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  waterIntake: number; // in ml
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietRecommendation {
  goal: string;
  suggestions: string[];
  foodsToInclude: string[];
  foodsToAvoid: string[];
}
