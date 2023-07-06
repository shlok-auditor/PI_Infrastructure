FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Expose the Redis default port
EXPOSE 6379

COPY . .

RUN npm install -g ts-node-dev

EXPOSE 5000

# CMD [ "npm", "run", "start" ]
CMD ["bash", "-c", "service redis-server start && npm start"]

ENV POSTGRES_HOST=postgres-db
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DB=route_plan


# FROM node:14-alpine
# # RUN apk add --no-cache python2 g++ make
# RUN mkdir -p /app
# WORKDIR /app
# COPY . .
# RUN yarn install

# RUN yarn build
# RUN yarn create-db
# RUN yarn migrations



