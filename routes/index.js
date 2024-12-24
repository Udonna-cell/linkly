const express = require('express');
const router = express.Router();
const sass = require("sass")
const path = require("path")
const fs = require("fs")
const { connection } = require("../db")
const os = 

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  connection.query('SELECT * FROM linkly', function (error, results, fields) {
    if (error) throw error;
    // connected!
    console.log(results[0].user);
    // console.log(os.head);
  });




  let css = sass.compile(path.resolve(__dirname, "../sass/style.scss")).css
  try {
    fs.writeFileSync(path.resolve(__dirname, "../public/stylesheets/style.css"),css)
  } catch (error) {
    console.error("faild to style the page")
  }
  res.render('index', { title: 'Express', isEmpty: true});
});

module.exports = router;
