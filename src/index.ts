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
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://health-monitor-app.vercel.app',
    'https://health-monitor-app-username.vercel.app',  // Replace with YOUR Vercel URL
    'https://*.vercel.app'
  ],
  credentials: true
}));
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
