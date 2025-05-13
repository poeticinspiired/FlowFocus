#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Create database and run migrations
echo "Setting up database..."
npx prisma migrate dev --name init

echo "Setup complete! You can now run 'npm run dev' to start the development server." 