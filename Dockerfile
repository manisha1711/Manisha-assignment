# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the HTTP server to serve the build files
CMD ["serve", "-s", "dist", "-l", "3000"]