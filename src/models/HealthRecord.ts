export interface HealthRecord {
  userId: string;
  date: Date;
  vitals: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    weight?: number;
    temperature?: number;
    sleepHours?: number;
  };
  painLevel?: number; // 0-10 scale
  painLocation?: string;
  mood?: string;
  energyLevel?: number; // 0-10 scale
  notes?: string;
}

export interface HealthTrend {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  recommendation: string;
}
