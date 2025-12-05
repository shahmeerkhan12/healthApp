import { Router } from 'express';
import { DietService } from '../services/diet.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import DietPlan from '../models/DietPlan.model';
import HealthRecord from '../models/HealthRecord.model';

const router = Router();
const dietService = new DietService();

router.post('/plans', authenticate, async (req: AuthRequest, res) => {
  try {
    const dietPlan = new DietPlan({
      userId: req.userId,
      ...req.body
    });
    await dietPlan.save();
    res.status(201).json({ message: 'Diet plan created', data: dietPlan });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create diet plan', error });
  }
});

router.get('/plans', authenticate, async (req: AuthRequest, res) => {
  try {
    const plans = await DietPlan.find({ userId: req.userId }).sort({ date: -1 }).limit(7);
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch diet plans', error });
  }
});

router.get('/recommendations', authenticate, async (req: AuthRequest, res) => {
  try {
    const { goal } = req.query;
    const healthRecords = await HealthRecord.find({ userId: req.userId }).sort({ date: -1 }).limit(14);
    const recommendations = dietService.generateDietRecommendations(healthRecords as any, goal as string || 'general health');
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate recommendations', error });
  }
});

export default router;
