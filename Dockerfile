FROM node:lts-alpine
RUN mkdir -p /base
COPY package.json /base
WORKDIR /base
ENV NODE_ENV=dev
ARG TZ='America/Chihuahua'
ENV TZ ${TZ}
RUN apk upgrade --update \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && rm -rf \
  /var/cache/apk/*
RUN npm install
RUN mkdir /logs
RUN chmod 777 -R /logs
RUN chown -R node: /logs
