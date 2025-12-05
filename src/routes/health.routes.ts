import { Router } from 'express';
import { HealthService } from '../services/health.service';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import HealthRecord from '../models/HealthRecord.model';

const router = Router();
const healthService = new HealthService();

router.post('/records', authenticate, async (req: AuthRequest, res) => {
  try {
    const healthRecord = new HealthRecord({
      userId: req.userId,
      ...req.body
    });
    await healthRecord.save();
    res.status(201).json({ message: 'Health record added', data: healthRecord });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add health record', error });
  }
});

router.get('/records', authenticate, async (req: AuthRequest, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.userId }).sort({ date: -1 }).limit(30);
    res.json({ records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error });
  }
});

router.get('/trends', authenticate, async (req: AuthRequest, res) => {
  try {
    const records = await HealthRecord.find({ userId: req.userId }).sort({ date: -1 }).limit(30);
    const trends = healthService.analyzeHealthTrends(records as any);
    res.json({ trends });
  } catch (error) {
    res.status(500).json({ message: 'Failed to analyze trends', error });
  }
});

router.put('/records/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const record = await HealthRecord.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record updated', data: record });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error });
  }
});

router.delete('/records/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error });
  }
});

export default router;
