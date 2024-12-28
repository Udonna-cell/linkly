// download.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Downloads a file from a URL and saves it to a specified path.
 * @param {string} url - The URL of the file to download.
 * @param {string} fileName - The name to save the file as in the temp directory.
 */
async function downloadFile(url, fileName) {
  try {
    // Ensure the 'temp' directory exists
    const tempDir = path.join(__dirname,"../", 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // The full path to save the downloaded file
    const filePath = path.join(tempDir, fileName);

    // Get the file from the URL
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'  // Download the file as a stream
    });

    // Pipe the response data (the file) to the file path
    response.data.pipe(fs.createWriteStream(filePath));

    // Wait until the file has been fully written
    response.data.on('end', () => {
      console.log(`File downloaded and saved to ${filePath}`);
    });

    response.data.on('error', (err) => {
      console.error('Error downloading the file:', err);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = downloadFile;
