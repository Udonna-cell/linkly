const btn = document.querySelector(".input > button");
const inputLayer = document.querySelector(".input");
const tableBody = document.querySelector(".tbody");

btn.addEventListener("click", () => {
  if (input && input.value) {
    btn.innerHTML = `
      <div class="load-1"></div>
      <div class="load-2"></div>
      <div class="load-3"></div>
    `;
    let isURLValid = validateURL(input.value);
    if (isURLValid) {
      inputLayer.classList.remove("invalid");
      inputLayer.classList.add("valid");
      socket.send(JSON.stringify({ url: input.value, cookie }));
    } else {
      inputLayer.classList.remove("valid");
      inputLayer.classList.add("invalid");
      btn.innerHTML = `
        <p>Shorten Now!</p>
        <div class='icon'>
          <img src="/images/arrow-right.svg" alt="arrow-right icon"/>
        </div>
      `;
    }
  }
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener("message", (event) => {
  const data = event.data;
  try {
    const parsedData = JSON.parse(data);
    console.log(parsedData.userLinks);

    // Change button content after receiving the message
    btn.innerHTML = `
      <p>Shorten Now!</p>
      <div class='icon'>
        <img src="/images/arrow-right.svg" alt="arrow-right icon"/>
      </div>
    `;
    alertSuccess(parsedData.msg);

    let tableDataTemplate = ""; // Initialize as empty string
    if (parsedData.userLinks !== undefined && parsedData.userLinks.length > 0) {
      const lastLink = parsedData.userLinks[parsedData.userLinks.length - 1];
      tableDataTemplate = `
        <div class="tr">
          <div class="td">
            <a href="${lastLink.short}">${lastLink.short}</a>
            <img src="/images/Frame 46.svg" alt="link icon" onclick="copyToClipboard('${lastLink.short}')">
          </div>
          <div class="td display">
            <div class="btn drop dark" onclick="${lastLink.action}">
              <img src="/images/chevron-down.svg" alt="chevron-down icon">
            </div>
          </div>

          <div class="td hide">
            ${lastLink.original}
          </div>
          <div class="td center" onclick="${lastLink.action}">
            <img src="/images/image 4.svg" alt="qr code icon">
          </div>
          <div class="td">
            ${lastLink.clicks}
          </div>
          ${lastLink.status
            ? `
              <div class="td active hide">
                Active
                <div>
                  <img src="/images/Frame 46 (1).svg" alt="link icon">
                </div>
              </div>
            `
            : `
              <div class="td inactive hide">
                Inactive
                <div>
                  <img src="/images/Frame 46 (2).svg" alt="link icon">
                </div>
              </div>
            `
          }
          <div class="td hide">
            Oct - 10 - 2023
          </div>
        </div>
      `;
    }
    
    try {
      tableBody.querySelector(".empty").style.display = "none";
    } catch (error) {
      console.log("data table not null");
    }

    tableBody.innerHTML = tableDataTemplate + tableBody.innerHTML;
    console.log(parsedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});

// Event listener for when the WebSocket connection is opened
socket.addEventListener("open", () => {
  console.log("Connected to the WebSocket server!");
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
