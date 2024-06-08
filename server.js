const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const client = require('./bot');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('deleteBotMessages', (data) => {
    const { channelId, botId } = data;

    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.messages.fetch().then((messages) => {
        messages.forEach((message) => {
          if (message.author.id === botId) {
            message.delete().catch(console.error);
          }
        });
      }).catch(console.error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Web console listening on port 3000');
});
