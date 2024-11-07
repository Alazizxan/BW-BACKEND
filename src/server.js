const http = require('http');
const socket = require('socket.io');
const app = require('./app');
const prisma = require('./utils/prisma');
const { initializeSocket } = require('./socket');
const { createTriggerFunction, listenToNotifications } = require('./utils/trigger');

const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Start the server
async function startServer() {
  await prisma.$connect();
  await createTriggerFunction();
  await listenToNotifications(io);

  initializeSocket(io);

  server.listen(process.env.PORT, () => console.log(`> Listening on port ${process.env.PORT}`));
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

startServer();
