document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    document.getElementById('botForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const channelId = document.getElementById('channel-id').value;
      const botId = document.getElementById('bot-id').value;
  
      socket.emit('deleteBotMessages', { channelId, botId });
  
      alert('Request to delete bot messages sent');
    });
  });
  