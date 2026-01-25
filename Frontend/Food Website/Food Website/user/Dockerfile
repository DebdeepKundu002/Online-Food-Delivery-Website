# ---------- Build Stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# ✅ Vite env variables (ADD BOTH)
ARG VITE_API_URL
ARG VITE_CLOUDINARY_API
ARG VITE_RAZORPAY_KEY
ARG VITE_FACEBOOK_1
ARG VITE_FACEBOOK_2
ARG VITE_LINKEDIN_1
ARG VITE_LINKEDIN_2

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUDINARY_API=$VITE_CLOUDINARY_API
ENV VITE_RAZORPAY_KEY=$VITE_RAZORPAY_KEY
ENV VITE_FACEBOOK_1=$VITE_FACEBOOK_1
ENV VITE_FACEBOOK_2=$VITE_FACEBOOK_2
ENV VITE_LINKEDIN_1=$VITE_LINKEDIN_1
ENV VITE_LINKEDIN_2=$VITE_LINKEDIN_2

# Build the frontend
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.23-alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
