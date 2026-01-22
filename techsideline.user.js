// ==UserScript==
// @name         TechSideline
// @namespace    http://tampermonkey.net/
// @version      2024-09-03
// @description  try to take over the world!
// @author       You
// @match        https://virginiatech.sportswar.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sportswar.com
// @grant        GM_addStyle
// @version      2
// ==/UserScript==

// Add various CSS styles.
var css =
    ":has(nav.navbar) { width: 100% !important } " +
    ".customer-img { width: 30px !important } " +
    ".customer-img { height: 30px !important } " +
    "div[class*='SiteTagLine'] { display: none !important } " +
    "div[class*='MiniHeaderWrap'] { padding: 0px 0px !important } " +
    "div.sw_freestar_container { display: none !important } " +
    "";
GM_addStyle(css);
