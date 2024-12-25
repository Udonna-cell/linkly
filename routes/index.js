const express = require("express");
const router = express.Router();
const sass = require("sass");
const path = require("path");
const fs = require("fs");
const { connection } = require("../utility/db");

/* GET home page. */
router.get("/", async function (req, res, next) {
  
    // const cookies = req.headers.cookie;
    // let user = getAllCookies(cookies).user;
    // connection.query(
    //   "SELECT * FROM `linkly` WHERE user=?",
    //   [user],
    //   function (error, results, fields) {
    //     if (error) throw error;
    //     // connected!
    //     console.log(results);
    //     // console.log(os.head);

    //     let isEmpty = results.length == 0 ? true : false;

    //     let css = sass.compile(
    //       path.resolve(__dirname, "../sass/style.scss")
    //     ).css;
    //     try {
    //       fs.writeFileSync(
    //         path.resolve(__dirname, "../public/stylesheets/style.css"),
    //         css
    //       );
    //     } catch (error) {
    //       console.error("faild to style the page");
    //     }
    //     connection.end(err => {
    //       if (err) throw err;
    //       console.log("connection closed!!");
    //     })
    //     res.render("index", { title: "Express", isEmpty, results });
    //   }
    // );

    let isEmpty = false
    let results = []
    res.render("index", { title: "Express", isEmpty, results });

  function getAllCookies(cook) {
    const cookies = {};
    const cookieArr = cook.split(";");
    cookieArr.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    return cookies;
  }
});

module.exports = router;
