FROM node:10.15.0-alpine

WORKDIR /usr/src/openfin-react-starter

COPY package/package.json ./package.json

RUN npm install

COPY build build
COPY config config
COPY scripts/server.js scripts/server.js
COPY .env* ./
COPY .dockerignore ./

EXPOSE 8080

CMD ["node", "scripts/server.js"]