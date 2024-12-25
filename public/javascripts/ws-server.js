const btn = document.querySelector(".input > button");

// Event listener for button click
btn.addEventListener("click", () => {
  if (input && input.value) {
    btn.innerHTML = `
      <div class="load-1"></div>
      <div class="load-2"></div>
      <div class="load-3"></div>
    `;
    socket.send(JSON.stringify({ url: input.value }));
  }
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener("message", (event) => {
  const message = event.data;

  // Change button content after receiving the message
  btn.innerHTML = `
    <p>Shorten Now!</p>
    <div class='icon'>
      <img src="/images/arrow-right.svg" alt="arrow-right icon"/>
    </div>
  `;
  console.log(message);

  // Optionally alert or log the shortened URL
  // alert(`New URL: ${JSON.parse(message).url}`);
});

// Event listener for when the WebSocket connection is opened
socket.addEventListener("open", () => {
  console.log("Connected to the WebSocket server!");
  alert("Connected to the WebSocket server!");
});

// Event listener for WebSocket errors
socket.addEventListener("error", (error) => {
  console.error("WebSocket Error:", error);
  alert("There was an error with the WebSocket connection.");
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener("close", () => {
  console.log("Disconnected from the WebSocket server");
  alert("Disconnected from the WebSocket server.");
});

// Helper function to get all cookies
function getAllCookies() {
  const cookies = {};
  const cookieArr = document.cookie.split(";");
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  return cookies;
}

// Helper function to generate a random user ID
function generateUserId(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomIndex];
  }
  return randomStr;
}

// Function to set user cookie and send user ID to WebSocket server
function setUser() {
  const cookies = getAllCookies();
  let userId = cookies.user;

  if (!userId) {
    userId = generateUserId();

    let date = new Date();
    date.setMinutes(date.getMinutes() + 10); // Cookie expires in 10 minutes
    document.cookie = `user=${userId}; expires=${date.toUTCString()}; path=/`;

    // Send the user ID to the WebSocket server
    socket.send(JSON.stringify({ userId }));
  }
}

function deleteAllCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  });
}

// Initialize the user on page load
const cookies = getAllCookies();
let userId = cookies.user;

if (!false) {
  userId = generateUserId();

  let date = new Date();
  date.setMinutes(date.getMinutes() + 10); // Cookie expires in 10 minutes
  document.cookie = `user=${userId}; expires=${date.toUTCString()}; path=/`;

  // Send the user ID to the WebSocket server
  socket.send(JSON.stringify({ userId }));
}
