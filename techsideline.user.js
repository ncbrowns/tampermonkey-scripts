// ==UserScript==
// @name         TechSideline
// @version      7
// @description  Miscellaneous enchancements for Tech Sideline.
// @match        https://techsideline.com/*
// @icon         https://techsideline.com/static/apple-touch-icon.png
// @grant        GM_addStyle
// ==/UserScript==

// Add various CSS styles.
var css =
    // Hide ad placeholders.
    "div:has(.container [data-ad-slot-key='above_header']) { display: none !important } " +
    "div:has(>a[rel*='sponsored']) { display: none !important } " +
    "div:has(>div.freestar-ad-slot[data-ad-slot-key^='board_feed']) { display: none !important } " +

    // Make the sticky posts take less vertical space.
    "div:has(>span[title='Sticky Post']) { padding-top: 3px !important; padding-bottom: 3px !important } " +

    // Remove excess whitespace at the top of the main board area.
    "main { padding-top: 0px !important } " +

    // Remove extra space between threads in the classic view.
    "div.thread-starter { padding-top: 3px !important } " +

    // Shrink the logo to avoid extra space on the page.
    "img[src*='tsl_logo_circular_337px_wide.png'] { transform: scale(0.5) } " +

    "";
GM_addStyle(css);
