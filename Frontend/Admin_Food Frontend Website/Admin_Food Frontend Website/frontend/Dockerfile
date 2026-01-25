

# ---------- Build Stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Vite environment variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the frontend
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.23-alpine

# ❌ Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# ✅ Copy custom nginx config (SPA support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ❌ Remove default html files
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
