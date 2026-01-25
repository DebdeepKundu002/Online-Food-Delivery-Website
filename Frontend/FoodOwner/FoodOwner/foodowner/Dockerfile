# ---------- Build Stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# ✅ Vite environment variable
ARG VITE_API_URL
ARG VITE_CLOUDINARY_API

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUDINARY_API=$VITE_CLOUDINARY_API

# Build
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.23-alpine

# ❌ Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# ✅ Copy custom nginx config (SPA support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
