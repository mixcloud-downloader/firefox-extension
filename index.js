var tabs = require("sdk/tabs");
var self = require("sdk/self");
var cm = require("sdk/context-menu");

var urlPattern = 'https?://([^\.]+\.)?mixcloud.com(/[^/]+/[^/]+/?)';

cm.Item({
    label: "Download Mix",
    context: cm.URLContext(new RegExp(urlPattern, "i")),
    image: self.data.url("icon-128.png"),
    contentScript: 'self.on("click", function() { self.postMessage(); });',
    onMessage: handleClick
});

function handleClick () {
    var regExp = new RegExp(urlPattern, "i");
    var matches = regExp.exec(tabs.activeTab.url);
    var downloadUrl = "http://www.mixcloud-downloader.com" + matches[2] + "?utm_source=firefox-extension";
    tabs.open(downloadUrl);
};
