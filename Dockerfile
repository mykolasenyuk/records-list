FROM node:19.2-alpine

ENV DB_HOST ""
ENV SECRET_KEY ""
ENV USERNAME ""
ENV PASSWORD ""

# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN npm i

# Copy app source code
COPY . .

# Env setup
COPY .env .env

#Expose port and begin application
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start"]

