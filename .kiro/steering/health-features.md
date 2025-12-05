---
inclusion: always
---

# Health Monitor Features Guide

## Core Features

### 1. Health Records Management
- Track daily health metrics: pain levels, energy, mood, sleep, vitals
- Visual indicators with emoji feedback (0-10 scales)
- Edit and delete existing records
- Historical data viewing

### 2. Activity Scheduling
- Schedule activities with time and duration
- Get smart recommendations based on current health status
- Activity rescheduling suggestions when pain/energy levels are unfavorable
- Track completed activities

### 3. Diet Recommendations
- Personalized diet suggestions based on health data
- Anti-inflammatory food recommendations for pain management
- Energy-boosting food suggestions
- Foods to include and avoid lists

### 4. Dashboard Analytics
- Weekly health summary with trends
- Average pain, energy, and sleep metrics
- Trend analysis (improving/stable/declining)
- Personalized health recommendations
- Downloadable health reports

### 5. User Authentication
- Secure registration and login with JWT
- Password hashing with bcrypt
- Protected routes and API endpoints
- User profile management

## Implementation Guidelines

### Pain Level Tracking
- Use 0-10 scale with visual feedback
- 0 = No pain (😊)
- 1-3 = Mild (😐)
- 4-6 = Moderate (😟)
- 7-8 = Severe (😣)
- 9-10 = Very Severe (😫)

### Energy Level Tracking
- Use 0-10 scale with visual feedback
- 0 = Exhausted (😴)
- 1-3 = Low (😪)
- 4-6 = Moderate (😐)
- 7-8 = Good (🙂)
- 9-10 = Excellent (⚡)

### Activity Recommendations Logic
- High pain (≥7): Suggest rescheduling
- Moderate pain (4-6) + high intensity activity: Suggest modifications
- Low energy (<3) + exercise: Suggest rescheduling
- Otherwise: Proceed with activity

### Diet Recommendations Logic
- Low energy: Suggest iron-rich foods
- High pain: Suggest anti-inflammatory foods
- General health: Emphasize hydration and balanced diet
