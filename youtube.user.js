// ==UserScript==
// @name         YouTube 1.5x
// @version      3
// @description  Play YouTube videos at 1.5x by default.
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
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

