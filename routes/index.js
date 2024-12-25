const express = require("express");
const router = express.Router();
const sass = require("sass");
const path = require("path");
const fs = require("fs");
const { connection } = require("../utility/db");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

function getAllCookies(cook) {
  const cookies = {};
  const cookieArr = cook.split(";");
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  return cookies;
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  const cookies = req.headers.cookie;
  let user = getAllCookies(cookies).user;
  connection.query(
    "SELECT * FROM `linkly` WHERE user=?",
    [user],
    function (error, results, fields) {
      if (error) throw error;
      // connected!
      console.log(results);
      // console.log(os.head);


      let isEmpty = results.length == 0? true : false 

      let css = sass.compile(path.resolve(__dirname, "../sass/style.scss")).css;
      try {
        fs.writeFileSync(
          path.resolve(__dirname, "../public/stylesheets/style.css"),
          css
        );
      } catch (error) {
        console.error("faild to style the page");
      }
      res.render("index", { title: "Express", isEmpty, results});
    }
  );
});

module.exports = router;
