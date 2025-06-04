# Dockerfile for Next.js
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on
EXPOSE 3004

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD npm start
