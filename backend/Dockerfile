# Use stable Node
FROM node:20

# App directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript → dist/
RUN npm run build

# Expose backend port
EXPOSE 8080

# Start compiled app
CMD ["npm", "start"]
