const MongoMemoryServer = require('mongodb-memory-server')

const mongod = new MongoMemoryServer.default({
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const url = await mongod.getConnectionString()

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;

  process.env.MONGO_URL = url
  process.env.PORT='8989'
  process.env.HOST='localhost'
  process.env.DB_NAME='jest'
  process.env.JWT_SECRET='my_secret'
  process.env.JWT_EXP='500000'
}
