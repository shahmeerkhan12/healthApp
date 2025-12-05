import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';
import dietRoutes from './routes/diet.routes';
import activityRoutes from './routes/activity.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/activity', activityRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Health Monitor API', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
