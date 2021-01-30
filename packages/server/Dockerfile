FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APOLLO_KEY=service:SpaceX-83gisc:J8xmxkwbTwS7CTMsCiUsuA
ENV DATABASE_HOST=postgres
ENV DATABASE_NAME=space
ENV DATABASE_PASSWORD=secret
ENV DATABASE_PORT=5432
ENV DATABASE_USER=docker

EXPOSE 3333

CMD npm run dev
