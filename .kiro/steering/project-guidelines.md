---
inclusion: always
---

# Health Monitor App - Project Guidelines

## Project Overview
This is a comprehensive health monitoring application that tracks user health metrics over time and provides personalized recommendations for pain management, activity scheduling, and diet planning.

## Technology Stack
- **Backend**: Node.js, Express, TypeScript, MongoDB (Atlas)
- **Frontend**: React 18, TypeScript, Vite
- **Authentication**: JWT with bcrypt
- **Database**: MongoDB with Mongoose ODM

## Code Standards

### TypeScript
- Use strict type checking
- Define interfaces for all data models
- Avoid `any` types when possible
- Use proper type annotations for function parameters and return values

### API Design
- RESTful endpoints with proper HTTP methods
- Consistent error handling with appropriate status codes
- Authentication middleware for protected routes
- Request validation before processing

### React Components
- Functional components with hooks
- Proper state management with useState and useEffect
- Clean separation of concerns
- Reusable components where applicable

### Security
- Never commit sensitive data (.env files)
- Use environment variables for configuration
- Implement proper authentication and authorization
- Validate and sanitize user inputs

## File Structure
```
src/
├── config/         # Database and app configuration
├── controllers/    # Request handlers
├── middleware/     # Authentication and validation
├── models/         # Mongoose schemas
├── routes/         # API route definitions
└── services/       # Business logic

client/
├── src/
│   ├── components/ # Reusable React components
│   ├── context/    # React context providers
│   ├── pages/      # Page components
│   └── styles/     # CSS files
```

## Development Workflow
1. Define data models first
2. Create API endpoints with proper authentication
3. Implement business logic in services
4. Build frontend components
5. Test functionality end-to-end
6. Iterate based on user feedback
