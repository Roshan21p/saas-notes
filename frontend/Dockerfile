# Stage 1: Build stage
FROM node:20-alpine3.20 AS builder

WORKDIR /app

# Copy dependency files and tsconfig first for caching
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy full source code
COPY . .

# Build the project (typescript + vite)
RUN npm run build

# Stage 2: Production stage - Serve with nginx
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy custom nginx config for SPA routing if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
