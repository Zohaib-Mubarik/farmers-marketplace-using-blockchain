/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://TheFarmex_owner:tfgKS2CD1TmG@ep-falling-mountain-a5cn5kp0.us-east-2.aws.neon.tech/TheFarmex?sslmode=require',
    }
  };