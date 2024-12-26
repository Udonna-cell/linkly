const btn = document.querySelector(".input > button");
alert(cookie)


btn.addEventListener("click", () => {
  if (input && input.value) {
    btn.innerHTML = `
      <div class="load-1"></div>
      <div class="load-2"></div>
      <div class="load-3"></div>
    `;
    socket.send(JSON.stringify({ url: input.value, cookie }));
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

socket.addEventListener("close", () => {
  console.log("Disconnected from the WebSocket server");
  alert("Disconnected from the WebSocket server.");
});