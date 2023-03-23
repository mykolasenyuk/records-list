FROM node:19.2-alpine

ENV DB_HOST mongodb+srv://tecster:tecster2005@cluster0.xetew.mongodb.net/records_db?retryWrites=true&w=majority
ENV SECRET_KEY records_db
ENV USERNAME admin
ENV PASSWORD pass
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN npm i

# Copy app source code
COPY . .

# Env setup
COPY .env.example .env

#Expose port and begin application
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start"]

