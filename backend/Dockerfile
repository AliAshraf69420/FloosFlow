# Use Node.js 18 on Alpine Linux
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
# Using 'npm ci' for reproducible builds in production if package-lock exists
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Generate Prisma client
# This is necessary whenever the schema changes
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables for production
ENV NODE_ENV=production

# The command to run the app
CMD ["npm", "start"]
