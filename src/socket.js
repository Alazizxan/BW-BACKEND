const { getAndEmitCountdown } = require('./utils/countdown');

function initializeSocket(io) {
  io.on('connection', (socket) => {
    getAndEmitCountdown(socket);

    socket.on('disconnect', () => {});
  });
}

module.exports = { initializeSocket };
