"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

gulp.task("server", function()
{
  nodemon(
  {
    script: "./bin/www",
    ext: "js json html"
  });
});
