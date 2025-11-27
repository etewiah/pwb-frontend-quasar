# Develop stage
FROM node:18-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build stage
FROM develop-stage as build-stage
RUN npm run build

# Production stage
FROM node:18-alpine as production-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY server.js .
COPY --from=build-stage /app/dist/spa /app/dist/spa
EXPOSE 5000
CMD ["node", "server.js"]
