FROM node:lts-alpine3.15
WORKDIR /web
COPY . .
RUN npm config set registry https://registry.npmmirror.com && \
    npm install --force && npm install -g pm2 && npm run build

CMD ["sh", "-c", "pm2 start pm2.config.js && sh"]