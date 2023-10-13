import "dotenv/config";

const env = process.env.NODE_ENV;

const development = {
  port: process.env.PORT_DEV,
  dbUser: process.env.DB_USER_DEV,
  dbPassword: process.env.DB_PASSWORD_DEV,
  dbSid: process.env.DB_SID_DEV,
  dbHost: process.env.DB_HOST_DEV,
  dbPort: process.env.DB_PORT_DEV,
};

const production = {
  port: process.env.PORT_PRO,
  dbUser: process.env.DB_USER_PRO,
  dbPassword: process.env.DB_PASSWORD_PRO,
  dbSid: process.env.DB_SID_PRO,
  dbHost: process.env.DB_HOST_PRO,
  dbPort: process.env.DB_PORT_PRO,
};

export const config = {
  development,
  production,
};

export default config[env];
