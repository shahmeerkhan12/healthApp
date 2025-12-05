export interface Activity {
  id: string;
  userId: string;
  title: string;
  scheduledTime: Date;
  duration: number; // in minutes
  type: 'exercise' | 'work' | 'rest' | 'social' | 'other';
  intensity?: 'low' | 'medium' | 'high';
  completed: boolean;
  rescheduled?: boolean;
}

export interface ActivityRecommendation {
  action: 'proceed' | 'reschedule' | 'modify';
  reason: string;
  suggestedTime?: Date;
  modifications?: string[];
}
