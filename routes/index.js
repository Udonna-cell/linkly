const express = require('express');
const router = express.Router();
const sass = require("sass")
const path = require("path")
const fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  let css = sass.compile(path.resolve(__dirname, "../sass/style.scss")).css
  try {
    fs.writeFileSync(path.resolve(__dirname, "../public/stylesheets/style.css"),css)
  } catch (error) {
    console.error("faild to style the page")
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
