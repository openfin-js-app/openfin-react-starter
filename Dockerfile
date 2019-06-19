FROM node:12.4.0-alpine

WORKDIR /usr/src/openfin-react-starter

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm","run","serve"]
