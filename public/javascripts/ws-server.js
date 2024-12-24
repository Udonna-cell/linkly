const btn = document.querySelector(".input > button");
// const input = document.querySelector(".input > input");

btn.addEventListener("click", () => {
  btn.innerHTML = `
  <div class="load-1"></div>
  <div class="load-2"></div>
  <div class="load-3"></div>
  `;
  socket.send(JSON.stringify({msg: input.value}));
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener("message", (event) => {
  const message = event.data;
  btn.innerHTML = `
  <p> Shorten Now!</p>
  <div class='icon'>
    <img src="/images/arrow-right.svg", alt="arrow-right icon"/>
  </div>`
  console.log(message)
});
// Event listener for when the WebSocket connection is opened
socket.addEventListener("open", () => {
  console.log("Connected to the WebSocket server!");
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener("close", () => {
  console.log("Disconnected from the WebSocket server");
});

// Event listener for sending messages to the server
// document.getElementById("sendBtn").addEventListener("click", () => {
//   const message = document.getElementById("messageInput").value;
//   if (message) {
//     socket.send(message); // Send the message to the server
//     document.getElementById("messageInput").value = ""; // Clear the input field
//   }
// });

function generateUserId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomIndex];
  }
  return randomStr;
}
function setUser() {
  const userId = generateUserId();
  socket.send(JSON.stringify({userId}));
}





setUser()