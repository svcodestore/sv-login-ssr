FROM node:lts-alpine3.15
WORKDIR /web
COPY . .
RUN npm config set registry https://registry.npmmirror.com && \
    npm install && npm run prod

CMD ["sh", "-c", "sh"]