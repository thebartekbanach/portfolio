FROM node:16.14.2 AS base

WORKDIR /src/portfolio-client


FROM base AS dev

ENV NODE_ENV development

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]


FROM base AS prod

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

ARG EMAIL_GATEWAY_API_ADDRESS
ARG HOTJAR_ID
ARG HOTJAR_VERSION

ENV EMAIL_GATEWAY_API_ADDRESS=$EMAIL_GATEWAY_API_ADDRESS
ENV HOTJAR_ID=$HOTJAR_ID
ENV HOTJAR_VERSION=$HOTJAR_VERSION
ENV NODE_ENV production

RUN npm run build

USER node

CMD ["npm", "start"]