# Health Monitor Application Specification

## Overview
A full-stack health monitoring application that helps users track their health metrics, manage activities, and receive personalized health recommendations.

## Requirements

### Functional Requirements

#### 1. User Management
- [ ] User registration with email and password
- [ ] Secure login with JWT authentication
- [ ] User profile with optional health information (age, gender, height, weight)
- [ ] Password encryption using bcrypt

#### 2. Health Records
- [ ] Create health records with multiple metrics
- [ ] View historical health records
- [ ] Edit existing health records
- [ ] Delete health records
- [ ] Metrics to track:
  - Pain level (0-10)
  - Pain location
  - Energy level (0-10)
  - Mood
  - Sleep hours
  - Heart rate
  - Weight
  - Notes

#### 3. Activity Management
- [ ] Schedule activities with title, time, duration, type, and intensity
- [ ] View scheduled activities
- [ ] Get activity recommendations based on current health status
- [ ] Activity types: exercise, work, rest, social, other
- [ ] Intensity levels: low, medium, high

#### 4. Diet Recommendations
- [ ] Generate personalized diet recommendations
- [ ] Recommendations based on:
  - Energy levels
  - Pain levels
  - Health goals
- [ ] Display foods to include and avoid
- [ ] Provide actionable diet suggestions

#### 5. Dashboard & Analytics
- [ ] Weekly health summary
- [ ] Trend analysis for pain, energy, and sleep
- [ ] Recent health records display
- [ ] Personalized recommendations
- [ ] Downloadable health reports
- [ ] Health app integration placeholders

### Technical Requirements

#### Backend
- [ ] Node.js with Express framework
- [ ] TypeScript for type safety
- [ ] MongoDB for data persistence
- [ ] Mongoose ODM for data modeling
- [ ] JWT for authentication
- [ ] RESTful API design
- [ ] CORS enabled for frontend communication

#### Frontend
- [ ] React 18 with TypeScript
- [ ] Vite for fast development
- [ ] React Router for navigation
- [ ] Axios for API calls
- [ ] Context API for state management
- [ ] Responsive design
- [ ] Visual feedback with emojis and sliders

#### Security
- [ ] Password hashing with bcrypt
- [ ] JWT token-based authentication
- [ ] Protected API routes
- [ ] Input validation
- [ ] Environment variables for sensitive data

### API Endpoints

#### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

#### Health Records
- POST /api/health/records - Create health record
- GET /api/health/records - Get user's health records
- PUT /api/health/records/:id - Update health record
- DELETE /api/health/records/:id - Delete health record
- GET /api/health/trends - Get health trends analysis

#### Activities
- POST /api/activity - Create activity
- GET /api/activity - Get user's activities
- POST /api/activity/check/:activityId - Check activity recommendation

#### Diet
- POST /api/diet/plans - Create diet plan
- GET /api/diet/plans - Get user's diet plans
- GET /api/diet/recommendations - Get diet recommendations

### Data Models

#### User
```typescript
{
  email: string (required, unique)
  password: string (required, hashed)
  name: string (required)
  age?: number
  gender?: 'male' | 'female' | 'other'
  height?: number
  weight?: number
  healthGoals?: string[]
  createdAt: Date
}
```

#### HealthRecord
```typescript
{
  userId: ObjectId (required)
  date: Date (default: now)
  vitals: {
    heartRate?: number
    bloodPressure?: { systolic: number, diastolic: number }
    weight?: number
    temperature?: number
    sleepHours?: number
  }
  painLevel?: number (0-10)
  painLocation?: string
  mood?: string
  energyLevel?: number (0-10)
  notes?: string
}
```

#### Activity
```typescript
{
  userId: ObjectId (required)
  title: string (required)
  scheduledTime: Date (required)
  duration: number (required, in minutes)
  type: 'exercise' | 'work' | 'rest' | 'social' | 'other'
  intensity?: 'low' | 'medium' | 'high'
  completed: boolean (default: false)
  rescheduled?: boolean
}
```

#### DietPlan
```typescript
{
  userId: ObjectId (required)
  date: Date (default: now)
  meals: [{
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
    time: string
    foods: [{
      name: string
      quantity: string
      calories: number
      protein: number
      carbs: number
      fats: number
    }]
    calories: number
  }]
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
  waterIntake: number (in ml)
}
```

## Implementation Status

✅ User authentication system
✅ Health records CRUD operations
✅ Activity management
✅ Diet recommendations
✅ Dashboard with analytics
✅ Weekly summary generation
✅ Health report download
✅ Visual indicators for pain/energy levels
✅ Trend analysis
✅ Responsive UI design

## Future Enhancements
- Integration with wearable devices (Fitbit, Apple Watch, Samsung Health)
- Machine learning for predictive health insights
- Medication tracking
- Doctor appointment scheduling
- Social features for sharing progress
- Mobile app (React Native)
- Push notifications for activity reminders
- Advanced data visualization with charts
