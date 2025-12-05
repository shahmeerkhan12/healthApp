import { HealthRecord, HealthTrend } from '../models/HealthRecord';

export class HealthService {
  analyzeHealthTrends(records: HealthRecord[]): HealthTrend[] {
    const trends: HealthTrend[] = [];
    
    // Analyze pain trends
    const painTrend = this.analyzePainTrend(records);
    if (painTrend) trends.push(painTrend);
    
    // Analyze sleep trends
    const sleepTrend = this.analyzeSleepTrend(records);
    if (sleepTrend) trends.push(sleepTrend);
    
    return trends;
  }

  private analyzePainTrend(records: HealthRecord[]): HealthTrend | null {
    const painRecords = records.filter(r => r.painLevel !== undefined);
    if (painRecords.length < 2) return null;

    const recentPain = painRecords.slice(-7).reduce((sum, r) => sum + (r.painLevel || 0), 0) / 7;
    const olderPain = painRecords.slice(-14, -7).reduce((sum, r) => sum + (r.painLevel || 0), 0) / 7;

    let trend: 'improving' | 'stable' | 'declining';
    let recommendation: string;

    if (recentPain < olderPain - 1) {
      trend = 'improving';
      recommendation = 'Your pain levels are decreasing. Continue current activities.';
    } else if (recentPain > olderPain + 1) {
      trend = 'declining';
      recommendation = 'Pain levels increasing. Consider rest and consult healthcare provider.';
    } else {
      trend = 'stable';
      recommendation = 'Pain levels stable. Maintain current routine.';
    }

    return { metric: 'Pain Level', trend, recommendation };
  }

  private analyzeSleepTrend(records: HealthRecord[]): HealthTrend | null {
    const sleepRecords = records.filter(r => r.vitals.sleepHours !== undefined);
    if (sleepRecords.length < 2) return null;

    const avgSleep = sleepRecords.reduce((sum, r) => sum + (r.vitals.sleepHours || 0), 0) / sleepRecords.length;

    let trend: 'improving' | 'stable' | 'declining';
    let recommendation: string;

    if (avgSleep >= 7 && avgSleep <= 9) {
      trend = 'stable';
      recommendation = 'Sleep duration is optimal. Keep it up!';
    } else if (avgSleep < 7) {
      trend = 'declining';
      recommendation = 'Insufficient sleep detected. Aim for 7-9 hours per night.';
    } else {
      trend = 'stable';
      recommendation = 'Sleep duration is above average. Ensure quality over quantity.';
    }

    return { metric: 'Sleep', trend, recommendation };
  }
}
