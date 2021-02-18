FROM node:14.9.0 AS base

WORKDIR /src/portfolio-client


FROM base AS dev

ENV NODE_ENV development

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]


FROM base AS prod

USER node
ENV NODE_ENV production

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

ARG EMAIL_GATEWAY_API_ADDRESS
ENV EMAIL_GATEWAY_API_ADDRESS=$EMAIL_GATEWAY_API_ADDRESS

RUN npm run build

CMD ["npm", "start"]