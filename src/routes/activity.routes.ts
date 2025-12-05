import { Router } from 'express';
import { ActivityService } from '../services/activity.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import Activity from '../models/Activity.model';
import HealthRecord from '../models/HealthRecord.model';

const router = Router();
const activityService = new ActivityService();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const activity = new Activity({
      userId: req.userId,
      ...req.body
    });
    await activity.save();
    res.status(201).json({ message: 'Activity created', data: activity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create activity', error });
  }
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId }).sort({ scheduledTime: 1 });
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/check/:activityId', authenticate, async (req: AuthRequest, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.activityId, userId: req.userId });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const latestHealth = await HealthRecord.findOne({ userId: req.userId }).sort({ date: -1 });
    if (!latestHealth) {
      return res.json({ recommendation: { action: 'proceed', reason: 'No health data available' } });
    }

    const recommendation = activityService.shouldRescheduleActivity(activity as any, latestHealth as any);
    res.json({ recommendation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check activity', error });
  }
});

export default router;
