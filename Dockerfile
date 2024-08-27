# Use the official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the project files into the working directory
COPY . .

# Expose the port the application will use
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "dev"]
