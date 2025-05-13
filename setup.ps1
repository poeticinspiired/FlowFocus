# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Generate Prisma client
Write-Host "Generating Prisma client..."
npx prisma generate

# Create database and run migrations
Write-Host "Setting up database..."
npx prisma migrate dev --name init

Write-Host "Setup complete! You can now run 'npm run dev' to start the development server." 