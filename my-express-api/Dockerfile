# Use the official Node.js 14 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Compile TypeScript
RUN npm run gcp-build

# Run the web service on container startup.
CMD [ "node", "dist/app.js" ]
