// Establish a WebSocket connection
const socket = new WebSocket('ws://localhost:3000');  // Assuming your WebSocket server is running on localhost:3000

// Event listener for when the WebSocket connection is opened
socket.addEventListener('open', () => {
  console.log('Connected to the WebSocket server!');
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener('message', (event) => {
  const message = event.data;  // This is the message sent by the server
  const messagesDiv = document.getElementById('messages');

  const newMessage = document.createElement('div');
  newMessage.textContent = `Server says: ${message}`;
  messagesDiv.appendChild(newMessage);
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener('close', () => {
  console.log('Disconnected from the WebSocket server');
});

// Event listener for sending messages to the server
document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  if (message) {
    socket.send(message);  // Send the message to the server
    document.getElementById('messageInput').value = '';  // Clear the input field
  }
});