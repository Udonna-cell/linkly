const btn = document.querySelector(".input > button");
// const input = document.querySelector(".input > input");

btn.addEventListener("click", () => {
  btn.innerHTML = `
  <div class="load-1"></div>
  <div class="load-2"></div>
  <div class="load-3"></div>
  `;
  socket.send(JSON.stringify({ url: input.value }));
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener("message", (event) => {
  const message = event.data;
  btn.innerHTML = `
  <p> Shorten Now!</p>
  <div class='icon'>
    <img src="/images/arrow-right.svg", alt="arrow-right icon"/>
  </div>`;
  console.log(message);
  alert(`new url ${JSON.parse(message).url}`);
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

function getAllCookies() {
  const cookies = {};
  const cookieArr = document.cookie.split(";");
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  return cookies;
}

function generateUserId(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomIndex];
  }
  return randomStr;
}
function setUser() {
  if (getAllCookies().user) {
    const userId = generateUserId();
    socket.send(JSON.stringify({ userId }));

    let date = new Date();
    date.setMinutes(date.getMinutes() + 10); // Cookie expires in 10 minutes
    document.cookie =
      `user=${userId}; expires=` + date.toUTCString() + "; path=/";

    // alert("found user");
    // alert(getAllCookies().user);
  } else {
    const userId = generateUserId();
    socket.send(JSON.stringify({ userId }));

    let date = new Date();
    date.setMinutes(date.getMinutes() + 10); // Cookie expires in 10 minutes
    document.cookie =
      `user=${userId}; expires=` + date.toUTCString() + "; path=/";
  }
}

setUser();
