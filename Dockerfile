# Erreur : n'arrive aps à trouver le module mongodb
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY app ./app

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]