# Stage 1: Build stage
FROM node:20-alpine3.20 as builder

# App directory
WORKDIR /app

# Copy only dependency files first (better caching)
# Copy package files
COPY package*.json ./

# Copy tsconfig
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript → dist/
RUN npm run build


# Stage 2: Production stage
FROM node:20-alpine3.20

WORKDIR /app

# Copy package.json FIRST
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy compiled output
COPY --from=builder /app/dist ./dist

EXPOSE 8080


ENTRYPOINT [ "npm", "start" ]

