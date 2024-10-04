# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Serve the build folder using a lightweight HTTP server
RUN npm install -g serve

# Expose the port for the app
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build", "-l", "3000"]
