const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const app = express();

mongoose.set('strictQuery', false);
logger.info('Connecting to MongoDB...');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogsRouter);

app.use((error, req, res, next) => {
  logger.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformed id' });
  }
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = config.PORT || 3003;

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}
