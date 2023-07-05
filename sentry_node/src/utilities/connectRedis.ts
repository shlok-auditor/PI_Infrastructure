import { createClient } from 'redis';
require('dotenv').config();


let redis_host = 'localhost'
const redisUrl = `redis://${redis_host}:${process.env.REDIS_URL_PORT}`;
console.log(redisUrl,redis_host);
// const redisUrl = 'redis://localhost:6379';

export const redisClient = createClient({
  url: redisUrl,
 
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    // console.log(error);
    // setTimeout(connectRedis, 5000);
  }
};

