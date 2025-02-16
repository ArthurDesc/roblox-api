# Base stage for both development and production
FROM node:18-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development
# Add development dependencies
COPY package*.json ./
RUN npm install
# Install SWC dependencies for Alpine
RUN npm install @next/swc-linux-x64-musl@14.1.0 --no-save
# Copy the rest of the application
COPY . .
# Expose port 3000
EXPOSE 3000
# Start the development server with hot reload
CMD ["sh", "/app/scripts/dev.sh"]

# Production stage
FROM base AS production
COPY package*.json ./
RUN npm install --production
RUN npm install @next/swc-linux-x64-musl@14.1.0 --no-save
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"] 