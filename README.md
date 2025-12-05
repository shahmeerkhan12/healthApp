# Health Monitor App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Kiro](https://img.shields.io/badge/Built%20with-Kiro%20AI-blue)](https://kiro.ai)

A comprehensive health monitoring application that tracks user health metrics over time and provides personalized recommendations for pain management, activity scheduling, and diet planning.

**🎥 Demo Video**: [3-Minute Demo on YouTube](#) *(Add your video link here)*

**🚀 Live Application**: [https://your-deployed-app.com](#) *(Add your deployment link here)*

**📂 Category**: Health & Wellness | **🎁 Bonus**: AI-Powered Features

## 🔑 Demo Credentials
For testing purposes, you can use:
- **Email**: demo@healthmonitor.com
- **Password**: demo123

Or register your own account at the live application.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Health Tracking**: Monitor vitals, pain levels, energy, mood, and sleep
- **Pain Management**: Track pain levels and get activity recommendations
- **Diet Suggestions**: Receive personalized diet plans based on health data
- **Activity Scheduling**: Smart activity rescheduling based on health status
- **Trend Analysis**: Visualize health trends over time
- **Balance Analysis**: Overall health balance monitoring

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Vite for fast development
- CSS Modules for styling

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Install dependencies for backend:**
   ```bash
   npm install
   ```

2. **Install dependencies for frontend:**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables:**
   - The `.env` file is already created with default values
   - Update `MONGODB_URI` if using a different database
   - Change `JWT_SECRET` for production

4. **Start MongoDB:**
   - If using local MongoDB: `mongod`
   - Or use MongoDB Atlas (cloud)

5. **Run the application:**

   **Backend (Terminal 1):**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:3000

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on http://localhost:5173

6. **Access the app:**
   Open http://localhost:5173 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Health Records
- `POST /api/health/records` - Add health record
- `GET /api/health/records` - Get user's health records
- `GET /api/health/trends` - Get health trends analysis

### Activities
- `POST /api/activity` - Create activity
- `GET /api/activity` - Get user's activities
- `POST /api/activity/check/:activityId` - Check activity recommendation

### Diet
- `POST /api/diet/plans` - Create diet plan
- `GET /api/diet/plans` - Get user's diet plans
- `GET /api/diet/recommendations` - Get diet recommendations

## Project Structure

```
health-monitor-app/
├── src/                      # Backend source
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── index.ts             # Entry point
├── client/                   # Frontend source
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS files
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
├── package.json
├── tsconfig.json
└── .env
```

## Usage

1. **Register**: Create a new account with your email and password
2. **Login**: Access your dashboard
3. **Add Health Records**: Track your daily vitals, pain, energy, and mood
4. **View Trends**: See how your health metrics change over time
5. **Schedule Activities**: Plan your activities and get recommendations
6. **Get Diet Advice**: Receive personalized diet suggestions based on your health data

## 🤖 Built with Kiro AI

This project was developed entirely using Kiro AI, demonstrating:
- **Vibe Coding**: Conversational development with iterative refinement
- **Spec-Driven Development**: Comprehensive specification-first approach
- **Steering Documents**: Consistent code patterns and feature guidelines
- **Agent Hooks**: Automated testing and linting workflows

See [KIRO_USAGE.md](./KIRO_USAGE.md) for detailed information on how Kiro was used.

## 📁 Kiro Configuration

The `.kiro/` directory contains:
- **specs/**: Project specifications and requirements
- **hooks/**: Agent hooks for automated workflows
- **steering/**: Development guidelines and feature documentation

⚠️ **Important**: The `.kiro` directory is NOT in `.gitignore` as required for submission.

## 🎯 Submission Checklist

- ✅ Open source repository with MIT License
- ✅ `.kiro` directory included (not in .gitignore)
- ✅ Functional application ready for deployment
- ✅ Demo credentials provided
- ✅ 3-minute demonstration video
- ✅ Category identified: Health & Wellness
- ✅ Bonus category: AI-Powered Features
- ✅ Comprehensive Kiro usage documentation

## 🚀 Future Enhancements

- Integration with wearable devices (Fitbit, Apple Watch, Samsung Health)
- Machine learning for predictive health insights
- Medication tracking
- Doctor appointment scheduling
- Social features for sharing progress
- Mobile app (React Native)
- Push notifications for activity reminders
- Advanced data visualization with charts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Kiro AI](https://kiro.ai) - Next-generation AI-powered IDE
- MongoDB Atlas for cloud database hosting
- React and Node.js communities for excellent documentation
