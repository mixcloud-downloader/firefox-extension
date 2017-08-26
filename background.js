var urlPattern = 'https?://([^\.]+\.)?mixcloud.com(/[^/]+/[^/]+/?)';

browser.contextMenus.create({
    id: "mixcloud-downloader",
    title: "Download Mix",
    contexts: ["all"],
    documentUrlPatterns: [
        "*://*.mixcloud.com/*/*",
        "*://mixcloud.com/*/*"
    ]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if(info.menuItemId != "mixcloud-downloader") {
        return;
    }
    
    console.log(tab.url);
    var regExp = new RegExp(urlPattern, "i");
    var matches = regExp.exec(tab.url);
    if (matches == null) {
        console.error("Couldn't extract key from " + tab.url);
        return;
    }
    var downloadUrl = "http://www.mixcloud-downloader.com/dl/mixcloud" + matches[2] + "?utm_source=firefox-extension";
    browser.tabs.create({
        url: downloadUrl
    });
});
