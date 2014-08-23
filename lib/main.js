var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*.news.ycombinator.com",
  contentScriptWhen: "ready",
  contentScriptFile: [data.url("localforage.min.js"), data.url("inject.js")]
});
