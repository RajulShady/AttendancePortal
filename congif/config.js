const environment = process.env.NODE_ENV || 'DEVELOPMENT';
const config = {
  DEVELOPMENT: {
      mongo: {
          url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/attendanceportal',
      },
  },
  PRODUCTION: {
      mongo: {
        url: process.env.MONGO_DB_URI || 'xxxx',
      },
  },
};

module.exports = config[environment];