// ==UserScript==
// @name                InoReader Enhancer
// @namespace           http://ncbrowns.com
// @description         Miscellaneous enchancements for Inoreader.
// @match               https://inoreader.com/*
// @match               https://www.inoreader.com/*
// @grant               GM_openInTab
// @grant               GM_addStyle
// @version             1
// ==/UserScript==

// Returns the currently selected article.
function getSelectedArticle()
{
    var selectedNodes = document.getElementsByClassName("article_current");
    if (!selectedNodes.length) return null;
    var links = selectedNodes[0].getElementsByClassName("article_title_link");
    if (!links.length) return null;
    return links[0];
}

function handleKeyPress(event) {
    console.log("InoReader Enhancer Event");

    // If we are currently focused on an input or text area, ignore the
    // hotkey.
    var element=event.target;
    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
        return;
    }

    var keyString = String.fromCharCode(event.which);
    switch (keyString) {
    case ";":
        // Find the article link and open in a background tab.
        var link = getSelectedArticle();
        console.log("open in background tab " + link);
        if (link) {
            var url = link.href;
            GM_openInTab(url, true);
        }
        break;
    default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
}

document.addEventListener("keypress", handleKeyPress, true);

console.log("Running InoReader Enhancer");

// Add various CSS styles.
var css =
    ".article_header_text { font-size: 16px !important }" +
    ".tree_node { font-size: 16px !important }" +
    ".leaderboard_ad { display: none !important }" +
    ".ad_size_wide_skyscraper { display: none !important }" +
    ".ad_title_centered { display: none !important }" +
    "";
GM_addStyle(css);

