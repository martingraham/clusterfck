var fs = require("fs"),
    path = require("path"),
    browserify = require("browserify");

var pkg = JSON.parse(fs.readFileSync("package.json"));

exports.build = function(dest) {
  browserify(pkg.main, {standalone:"clusterfck"}).bundle(function(err, buf) {
    fs.writeFileSync(dest, "/* MIT license */\n" + buf);
 });
}
