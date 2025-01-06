const { Sequelize } = require('sequelize');

const connectDB = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging for cleaner console output
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

module.exports = connectDB;
