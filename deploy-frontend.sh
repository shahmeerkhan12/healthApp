#!/bin/bash

echo "========================================="
echo "Deploying Frontend to Vercel"
echo "========================================="

# Navigate to client directory
cd client

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the frontend
echo "Building frontend..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo ""
echo "========================================="
echo "Frontend Deployment Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Copy the deployment URL"
echo "2. Update it in README.md"
echo "3. Configure backend URL in production"
