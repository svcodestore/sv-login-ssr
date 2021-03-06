FROM node:lts-alpine3.15
WORKDIR /web
COPY . .
RUN npm config set registry https://registry.npmmirror.com && \
    npm install && npm i -g pm2

CMD ["sh", "-c", "npm run prod && tail -F /dev/null"]
