var WebFont = require("webfont");

exports.locate = function(load) {
  return load.name.match(/[^/]*$/)[0].replace(/%20/g, ' ');
}

exports.fetch = function(load) {
  return new Promise(function(resolve, reject) {
    var fontName = load.address.split(" ")[0],
        params = load.address.substr(fontName.length + 1).split(",").map(function(s) {
          return s.trim();
        }),
        font = {},
        config = {
          active: function() { resolve("") },
          inactive: function() { reject() }
        };

    config[fontName] = font

    switch (fontName) {
      case "fontdeck":
      case "typekit":
        font.id = params.join(",");
        break;
      case "google":
        font.families = params;
        break;
      case "monotype":
        font.projectId = params[0];
        font.version = params[1];
    }

    WebFont.load(config);
  });
}
