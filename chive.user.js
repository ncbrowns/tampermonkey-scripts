// ==UserScript==
// @name         The Chive
// @version      3
// @description  Miscellaneous enhancements for The Chive.
// @match        http://thechive.com/*
// @match        https://thechive.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==
/* jshint -W097 */
'use strict';

////////////////////////////////////////////////////////////////////////////////

// find:  Find all the document nodes that match the XPath expression
// <search>.
function find(search) {
    return document.evaluate
        (search, document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// findcall:  Find all the document nodes that match the XPath expression
// <search> and calls the callback function <func> on each -- passing the
// matching node as a parameter.
function findcall(search, func)
{
    var items = find(search);
    var i;
    for (i = 0; i < items.snapshotLength; i++) {
        func(items.snapshotItem(i));
    }
}

// findone:  Finds one document node that matches the XPath expression
// <search>, and then goes up <ancestors> steps in the object hierarchy.
function findone(search, ancestors) {
    var hits = find(search);
    var item = null;

    if (hits.snapshotLength) {
        item = hits.snapshotItem(0);
    }
    if (ancestors) {
        for (var i = 0; i < ancestors; i++) {
            if (item === null) break;
            item = item.parentNode;
        }
    }
    return item;
}

function findPos(obj)
{
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return curtop;
    }
}

////////////////////////////////////////////////////////////////////////////////

// bbnew:  Create a new floating button box object, which will consist of
// a floating DIV in the upper-right corner of the visible window.
function bbnew() {
    var box = new Object({});
    var div, divtr, table, tr, td, input;

    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "4px";
    div.style.right = "4px";
    div.style.background = "#c0c000";
    div.style.opacity = "0.75";
    div.style.zIndex = "99999";

    // Create a master table to hold the button box and the retract button.
    table = document.createElement("table");
    divtr = document.createElement("tr");
    table.cellSpacing = "0px";
    table.style.borderSpacing = "2px";
    table.appendChild(divtr);
    div.appendChild(table);

    // Create a table cell for the button box; record its TR element for
    // future use.
    td = document.createElement("td");
    table = document.createElement("table");
    tr = document.createElement("tr");
    table.cellSpacing = "0px";
    table.style.borderSpacing = "2px";
    table.appendChild(tr);
    td.appendChild(table);
    divtr.appendChild(td);
    box.tr = tr;

    // Create a table cell for the retract button, which will show or hide
    // the main button box.
    td = document.createElement("td");
    input = document.createElement("input");
    input.type = "button";
    input.value = ">";
    input.displayChild = 1;
    input.child = box.tr;
    input.style.cssText = "color: #000000 !important; background-color: #c0c0c0 !important;";
    input.addEventListener('click',
        function () {
          if (input.displayChild) {
            input.value = "<";
            input.child.style.display = "none";
            input.displayChild = 0;
          } else {
            input.value = ">";
            input.child.style.display = "";
            input.displayChild = 1;
          }
        }, false);
    td.appendChild(input);
    divtr.appendChild(td);

    document.getElementsByTagName("body")[0].appendChild(div);

    return box;
}

// bbadd:  Add a new button to the button box object <box> with a
// label of <label>.  <action> is either a link or a JavaScript function
// object to call.  <data> is a piece callback data to pass if <action>
// is a function.
function bbadd(box, label, action, data)
{
    var td, button;
    td = document.createElement("td");
    button = document.createElement("input");

    button.value = label;
    button.type = "button";
    button.action = action;
    button.data = data;
    button.style.cssText = "color: #000000 !important; background-color: #c0c0c0 !important;";
    if (action instanceof Function) {
        button.addEventListener('click',
            function () {button.action(button);},
            false);
    } else {
        button.addEventListener('click',
            function () {window.open(action, "_self");},
            false);
    }

    td.appendChild(button);
    box.tr.appendChild(td);
    return button;
}

////////////////////////////////////////////////////////////////////////////////

var gallery = findone("//div[@class='gallery-items-wrap']");
var galleryoffset = -10; // vertical offset to align relative to gallery item
if (gallery.firstChild && gallery.firstChild.className == "") {
    gallery = gallery.firstChild;
}
var current = gallery;
var slide;
var slideNumber = 0;

document.addEventListener("keydown",

function(event) {

    // If we are currently focused on an input or text area, ignore the
    // hotkey.
    var element=event.target;
    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
        return;
    }

    if (!current) {
        return;
    }

    //alert("event.which is " + event.which);
    switch (event.which) {
    case 36: // Home
        current = gallery.firstChild;
        break;
    case 35: // End
        current = gallery.lastChild;
        break;
    case 37: // ArrowLeft
    case 75: // k
        if (slideNumber > 1) {
            slideNumber--;
        } else {
            slideNumber = 1;
        }
        slide = findone("//a[@name='slide-" + slideNumber + "']");
        if (slide) {
            current = slide.parentNode;
        } else if (current == gallery) {
            // do nothing
        } else {
            while (current.previousSibling) {
                current = current.previousSibling;
                if (!current.classList.contains("full-width-ad") &&
                    !current.classList.contains("repeat-target")) {
                    break;
                }
            }
        }
        break;
    case 39: // ArrowRight
    case 74: // j
        slideNumber++;
        slide = findone("//a[@name='slide-" + slideNumber + "']");
        if (!slide) {
            slideNumber--;
        }
        if (slide) {
            current = slide.parentNode;
        } else if (current == gallery) {
            current = gallery.firstChild;
        } else {
            while (current.nextSibling) {
                current = current.nextSibling;
                if (!current.classList.contains("full-width-ad") &&
                    !current.classList.contains("repeat-target")) {
                    break;
                }
            }
        }
        break;
    default:
        return;
    }

    var nextPos = findPos(current) + galleryoffset;
    window.scrollTo(0, nextPos);

    event.stopPropagation();
    event.preventDefault();
},

true);

var box = bbnew();

// Show or hide an array of nodes found in button.data.
function toggle_visibility(button)
{
    var nodes = button.data;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.style.display == "none") {
            node.style.display = "";
        } else {
            node.style.display = "none";
        }
    }
}

// Build a list of various header/footer nodes.
// Hide the nodes by default and add a button "(F)" to toggle their
// visibility.
var nodes = [];
var patterns = [
    "//header[@id='header']",
    "//div[@id='secondary-container']",
];
for (var i = 0; i < patterns.length; i++) {
     var node = findone(patterns[i]);
     if (node) {
        nodes.push(node);
    }
}

var button = bbadd(box, "(F)", toggle_visibility, nodes);
toggle_visibility(button);

// Make sure the page doesn't turn off the "overflow" property (scrollbars).  Also,
// set some timers to override any property changes made by scripts.
function allowOverflow()
{
    var csstext = ".tp-modal-open { overflow: visible !important; };";
    GM_addStyle(csstext);
}
allowOverflow();
setTimeout(allowOverflow, 1000);
setTimeout(allowOverflow, 2000);
setTimeout(allowOverflow, 3000);

