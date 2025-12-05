import { Activity, ActivityRecommendation } from '../models/Activity';
import { HealthRecord } from '../models/HealthRecord';

export class ActivityService {
  shouldRescheduleActivity(activity: Activity, latestHealth: HealthRecord): ActivityRecommendation {
    const painLevel = latestHealth.painLevel || 0;
    const energyLevel = latestHealth.energyLevel || 5;

    // High pain scenario
    if (painLevel >= 7) {
      return {
        action: 'reschedule',
        reason: 'High pain level detected. Rest is recommended.',
        suggestedTime: new Date(activity.scheduledTime.getTime() + 24 * 60 * 60 * 1000)
      };
    }

    // Moderate pain with high intensity activity
    if (painLevel >= 4 && activity.intensity === 'high') {
      return {
        action: 'modify',
        reason: 'Moderate pain detected. Consider reducing activity intensity.',
        modifications: ['Reduce duration by 50%', 'Lower intensity to medium', 'Add more rest breaks']
      };
    }

    // Low energy
    if (energyLevel < 3 && activity.type === 'exercise') {
      return {
        action: 'reschedule',
        reason: 'Low energy level. Consider rescheduling for better performance.',
        suggestedTime: new Date(activity.scheduledTime.getTime() + 4 * 60 * 60 * 1000)
      };
    }

    return {
      action: 'proceed',
      reason: 'Health metrics are favorable for this activity.'
    };
  }
}
