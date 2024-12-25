require("dotenv").config();
const WebSocket = require("ws");
const { connection } = require("./db");

const createWsServer = (server) => {
  const wss = new WebSocket.Server({ server });

  function generateURLId(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomStr = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomIndex];
    }
    return randomStr;
  }
  function getAllCookies(cook) {
    const cookies = {};
    console.log(cook);
    const cookieArr = cook.split(";");
    cookieArr.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    return cookies;
  }

  wss.on("connection", (ws, req) => {
    console.log(`Client connected to ${req.url}`);
    ws.send("Hello from WebSocket server!");

    ws.on("message", (message) => {
      message = JSON.parse(message);
      console.log("Received:", message);

      // Get list of users and check if they exist
      if (message.userId) {
        console.log("looking out for user");
      }

      if (message.url) {
        const cookies = req.headers.cookie;
        console.log(cookies);
        let user = getAllCookies(cookies).user;
        let originalURL = message.url;
        let base = process.env.URL || "http://localhost:5500/";
        let shortenLink = base + generateURLId(4);
        try {
          connection.query(
            "INSERT INTO `linkly` (`id`, `short`, `original`, `date`, `clicks`, `status`, `user`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, '0', '1', ?);",
            [shortenLink, originalURL, user],
            function (error, results, fields) {
              if (error) throw error;
              // connected!
              console.log("successfully inserted");

              connection.query(
                "SELECT * FROM `linkly` WHERE user=?",
                [user],
                function (error, results, fields) {
                  if (error) throw error;
                  // connected!
                  console.log("successfully inserted");
                  console.log(results);
                }
              );
              // console.log(os.head);
            }
          );
        } catch (error) {
          console.log("An error occurred");
        }
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};

module.exports = createWsServer;
