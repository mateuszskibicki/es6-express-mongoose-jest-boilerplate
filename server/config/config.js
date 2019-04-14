// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    host: process.env.MONGO_HOST,
    host_test: process.env.MONGO_HOST_TEST,
    port: process.env.MONGO_PORT
  }
};

export default config;
