function download(id) {
    const baseUrl = window.location.origin;
    window.location.href = baseUrl + "/users/" + id;
  }
  
  function downloadFile(url, filename) {
    const link = document.createElement("a");
    link.href = url; // Set the URL of the QR code image
    link.download = filename; // Set the filename for the download
    link.click(); // Trigger the download
  }
  