var express = require("express");
var router = express.Router();
const { connection } = require("../utility/db");
const path = require("path");
const downloadFile = require("../utility/download");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ msg: "respond with a resource" });
});

router.get("/:ID", function (req, res, next) {
  let id = req.params.ID;
  
  // Query the database for the short URL associated with the provided ID
  connection.query("SELECT `short` FROM `linkly` WHERE id = ?", [id], (err, result) => {
    if (err) {
      // Send an error response if there's a problem with the query
      return res.status(500).json({ error: "Database query error", details: err });
    }

    // If no result found, send an appropriate response
    if (result.length === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    // If the result is found, generate the short URL
    const shortUrl = result[0].short;
    let url = `https://quickchart.io/qr?text=${shortUrl}&ecLevel=H&margin=1&size=200&format=jpg`;

    // Download the file using the downloadFile function
    downloadFile(url, "linkly.jpg").then(() => {
      // After the download is complete, send the file to the client
      const filePath = path.join(__dirname, "..", "temp", "linkly.jpg");
      res.download(filePath, "linkly.jpg", (err) => {
        if (err) {
          return res.status(500).json({ error: "Error sending file", details: err });
        }
      });
    }).catch((downloadError) => {
      return res.status(500).json({ error: "Error downloading the QR code", details: downloadError });
    });
  });
});

module.exports = router;
