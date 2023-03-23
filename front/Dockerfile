FROM node:19.2-alpine as build

ENV REACT_APP_USERNAME admin
ENV REACT_APP_PASSWORD pass

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]