const radio = document.querySelector(".radio");
const radioPoint = document.querySelector(".radio > .point");
const input = document.querySelector(".input > input");
let radioState = false;

radio.addEventListener("click", () => {
  if (radioState) {
    radioPoint.classList.remove("on");
    radioState = false;
  } else {
    // Call the function to get clipboard text
    getClipboardText();

    radioPoint.classList.add("on");
    radioState = true;
  }
});

// Function to get text from clipboard
async function getClipboardText() {
  try {
    const text = await navigator.clipboard.readText();
    input.value = text;
    console.log("Clipboard text:", text);
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
}
