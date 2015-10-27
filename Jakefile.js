/*
  Turns CommonJS package into a browser file and minifies.

  uses node-jake http://github.com/mde/node-jake
  run with 'jake [build|minify|clean]'
*/
var fs = require("fs"),
    path = require("path"),
    util = require('util')
    browserify = require("browserify");

var pkg = JSON.parse(fs.readFileSync("package.json"));
var prefix = pkg.name + "-" + pkg.version;

desc('Build the browser script from Node modules');
task('build', {async: true}, function (dest) {
  console.log("building...");
  dest = dest || prefix + ".js";

  // Combine js files by parsing for 'require' calls
  browserify(pkg.main, {standalone:"clusterfck"}).bundle(function(err, buf) {
    fs.writeFileSync(dest, "/* MIT license */\n" + buf);
    complete();
  });

  console.log("> " + dest);
});

desc('Minify the dist script');
task('minify', ['build'], function (file, dest) {
  file = file || prefix + ".js";
  dest = dest || prefix + ".min.js";

  var minified = minify(fs.readFileSync(file, "utf-8"));
  fs.writeFileSync(dest, minified, "utf-8");
  console.log("> " + dest)
});

task('clean', [], function () {
  fs.unlink(prefix + ".js");
  fs.unlink(prefix + ".min.js");
});

task('default', ['build', 'minify']);

function minify(code) {
  var uglifyjs = require("uglify-js"),
      parser = uglifyjs.parser,
      uglify = uglifyjs.uglify;

  var ast = parser.parse(code);
  ast = uglify.ast_mangle(ast);
  ast = uglify.ast_squeeze(ast);
  return uglify.gen_code(ast);
}
