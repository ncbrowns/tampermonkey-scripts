// ==UserScript==
// @name         YouTube 1.5x
// @namespace    http://tampermonkey.net/
// @version      2025-10-15
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @vesion       1
// ==/UserScript==

//var setSpeedCallbackID;

//function setSpeed() {

//    document.dispatchEvent(new KeyboardEvent('keydown', {'key': ">"}));
//    document.dispatchEvent(new KeyboardEvent('keydown', {'key': ">"}));
//}

// setSpeedCallbackID = setInterval(setSpeed, 2500);

var setSpeedInterval;

function setSpeed() {
     var video = document.querySelector("video");
     if (video) {
         video.playbackRate = 1.5;
         clearInterval(setSpeedInterval);
     }
}

setSpeedInterval = setInterval(setSpeed, 1000);

