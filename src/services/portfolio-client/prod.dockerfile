FROM node:14.9.0

WORKDIR /src/portfolio-client

COPY package*.json ./
RUN npm install

COPY . .

ARG EMAIL_GATEWAY_API_ADDRESS
ENV EMAIL_GATEWAY_API_ADDRESS=$EMAIL_GATEWAY_API_ADDRESS

RUN npm run build

CMD ["npm", "start"]