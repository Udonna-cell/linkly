require("dotenv").config()
const express = require("express");
const router = express.Router();
const sass = require("sass");
const path = require("path");
const fs = require("fs");
const { connection } = require("../utility/db");
const actionAdder = require("../utility/actionAdder")

/* GET home page. */
router.get("/", async function (req, res, next) {
  // Retrieve cookies from request headers
  const cookies = req.headers.cookie;
  let user = cookies ? getAllCookies(cookies).user : null;

  console.log('Received cookie date: ', user);

  // If the user cookie is not found, generate a new user ID and set it
  if (!user) {
    user = generateUserId();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10); // Set cookie expiration (10 minutes from now)

    // Set the user cookie
    res.cookie("user", user, { expires: expirationDate, httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Use secure flag in production

    console.log(`New user cookie set: ${user}`);
  }

  // Query database to get user's links
  connection.query(
    "SELECT * FROM `linkly` WHERE user=?",
    [user],
    function (error, results) {
      if (error) {
        console.error("Error querying database:", error);
        return res.status(500).send("Database error");
      }

      console.log("Query results:", results);

      // Check if the results are empty
      const isEmpty = results.length === 0;

      // Compile SASS to CSS and write to the public directory
      try {
        const css = sass.compile(path.resolve(__dirname, "../sass/style.scss")).css;
        fs.writeFileSync(path.resolve(__dirname, "../public/stylesheets/style.css"), css);
      } catch (error) {
        console.error("Failed to compile SASS:", error);
        return res.status(500).send("Failed to compile CSS");
      }
      let wss = process.env.WS || "ws://192.168.40.92:3000/"
      results = (JSON.parse(JSON.stringify(results)));
      results = actionAdder(results)
      console.log(results);
      // Render the page with results
      res.render("index", { title: "Linkly", isEmpty, results, user, wss });
    }
  );
});


router.get("/:SHORT", async function (req, res, next){
  let baseURL = process.env.URL || "http://localhost:3000/"
  let ID = req.params.SHORT
  let shortenLink = baseURL + ID
  console.log(shortenLink);
  // connection.query("UPDATE linkly SET address = 'Canyon 123' WHERE address = 'Valley 345'")
  connection.query("SELECT original FROM linkly WHERE short=?",[shortenLink],(err, record)=>{
    if(err) throw err;
    console.log(record);
    res.redirect(record[0].original)
  })

})

// Helper function to parse cookies
function getAllCookies(cook) {
  const cookies = {};
  const cookieArr = cook.split(";");
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  return cookies;
}

// Helper function to generate a random user ID (e.g., 8 characters long)
function generateUserId(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomIndex];
  }
  return randomStr;
}

module.exports = router;
