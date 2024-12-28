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

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Append the textarea to the body
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  // Execute the copy command
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Optionally, show a success message
  alertSuccess('Text copied to clipboard!');
  console.log('Text copied to clipboard!');
}
