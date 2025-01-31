# Use Node.js 22 base image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
