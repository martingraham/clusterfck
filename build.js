var fs = require("fs"),
    path = require("path"),
    browserify = require("browserify");

var pkg = JSON.parse(fs.readFileSync("package.json"));

exports.build = function(dest) {
  browserify().require(path.join(__dirname, pkg.main)).bundle(function(err, source) {
    fs.writeFileSync(dest, "/* MIT license */\nvar clusterfck = (function() {"
                            + source + " return require('/clusterfck')})();");
 });
}
