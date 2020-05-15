# Specify a base image
FROM node:12.16.0-alpine AS alpine
WORKDIR /app
# Install dependencies
COPY package.json .
RUN npm install 
COPY . .
# Default command
ENTRYPOINT ["npm", "run", "migration:run", "&&","npm", "start"]