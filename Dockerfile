FROM node:12.8.1-alpine

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --production

COPY --chown=root:node . .

USER node
EXPOSE 9133
CMD [ "node", "." ]
