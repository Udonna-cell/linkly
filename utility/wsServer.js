require("dotenv").config();
const WebSocket = require("ws");
const { connection } = require("./db");

const createWsServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    // Helper function to generate a random URL ID
    function generateURLId(length = 8) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomStr = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomStr += characters[randomIndex];
      }
      return randomStr;
    }

    // Helper function to parse cookies from the request
    function getAllCookies(cook) {
      const cookies = {};
      if (cook) {
        const cookieArr = cook.split(";");
        cookieArr.forEach((cookie) => {
          const [key, value] = cookie.trim().split("=");
          cookies[key] = value;
        });
      }
      return cookies;
    }

    console.log(`Client connected to ${req.url}`);
    ws.send(JSON.stringify({ msg: "Hello from WebSocket server!" }));

    // Handling incoming messages from the client
    ws.on("message", async (message) => {
      message = JSON.parse(message);
      console.log("Received:", message);

      if (message.userId) {
        console.log(`Looking out for user: ${message.userId}`);
      }

      if (message.url) {
        try {
          const cookies = req.headers.cookie;
          console.log("Cookies:", cookies);
          let user = getAllCookies(cookies).user; // Extract user ID from cookies
          if (!user) {
            console.error("User not found in cookies");
            ws.send(JSON.stringify({ msg: "User not found in cookies" }));
            return;
          }

          let originalURL = message.url;
          let base = process.env.URL || "http://localhost:5500/";
          let shortenLink = base + generateURLId(4);

          // Insert the shortened link into the database
          connection.query(
            "INSERT INTO `linkly` (`id`, `short`, `original`, `date`, `clicks`, `status`, `user`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, '0', '1', ?);",
            [shortenLink, originalURL, user],
            function (error, results) {
              if (error) {
                console.error("Error inserting into database:", error);
                ws.send(JSON.stringify({ msg: "Error processing your request" }));
                return;
              }
              console.log("Successfully inserted the shortened link");

              // Query all links associated with the user
              connection.query(
                "SELECT * FROM `linkly` WHERE user=?",
                [user],
                function (error, results) {
                  if (error) {
                    console.error("Error fetching user links from database:", error);
                    return;
                  }
                  console.log("Successfully retrieved user links:", results);
                  ws.send(JSON.stringify({ msg: "Shortened URL created", shortenedURL: shortenLink, userLinks: results }));
                }
              );
            }
          );
        } catch (error) {
          console.error("An error occurred while processing the message:", error);
          ws.send(JSON.stringify({ msg: "An error occurred while processing your request" }));
        }
      }
    });

    // Handle WebSocket closure
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};

module.exports = createWsServer;
