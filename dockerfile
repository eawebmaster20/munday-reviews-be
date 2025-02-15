# An ARG declared before the FROM instruction cannot be used after the FROM
FROM node:hydrogen

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci 

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "npm", "start" ]
