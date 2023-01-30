FROM node:19.2-alpine

ENV REACT_APP_USERNAME admin
ENV  REACT_APP_PASSWORD pass


WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3002

CMD ["npm", "run", "build"]