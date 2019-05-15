(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// crud-project main.js file
// example of interest when intially added
// {
//     "id": 1,
//     "placeId": 1,
//     "name": "Local Market",
//     "description": "Local market where you can try purchase local products           and try the local food",
//      "cost": 0.00,
//       "review": "" }
// // example of interest after visited
// // { "id": 1,
//  "placeId": 1,
//   "name": "Local Market",
//    "description": "Local market where you can try purchase local products            and try the local food",
//      "cost": 0.00,
//     "review": "You can definitely get things for a lower price if you are           willing to bargain!" }
"use strict";

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGNydWQtcHJvamVjdCBtYWluLmpzIGZpbGVcblxuLy8gZXhhbXBsZSBvZiBpbnRlcmVzdCB3aGVuIGludGlhbGx5IGFkZGVkXG4vLyB7XG4vLyAgICAgXCJpZFwiOiAxLFxuLy8gICAgIFwicGxhY2VJZFwiOiAxLFxuLy8gICAgIFwibmFtZVwiOiBcIkxvY2FsIE1hcmtldFwiLFxuLy8gICAgIFwiZGVzY3JpcHRpb25cIjogXCJMb2NhbCBtYXJrZXQgd2hlcmUgeW91IGNhbiB0cnkgcHVyY2hhc2UgbG9jYWwgcHJvZHVjdHMgICAgICAgICAgIGFuZCB0cnkgdGhlIGxvY2FsIGZvb2RcIixcbi8vICAgICAgXCJjb3N0XCI6IDAuMDAsXG4vLyAgICAgICBcInJldmlld1wiOiBcIlwiIH1cblxuLy8gLy8gZXhhbXBsZSBvZiBpbnRlcmVzdCBhZnRlciB2aXNpdGVkXG4vLyAvLyB7IFwiaWRcIjogMSxcbi8vICBcInBsYWNlSWRcIjogMSxcbi8vICAgXCJuYW1lXCI6IFwiTG9jYWwgTWFya2V0XCIsXG4vLyAgICBcImRlc2NyaXB0aW9uXCI6IFwiTG9jYWwgbWFya2V0IHdoZXJlIHlvdSBjYW4gdHJ5IHB1cmNoYXNlIGxvY2FsIHByb2R1Y3RzICAgICAgICAgICAgYW5kIHRyeSB0aGUgbG9jYWwgZm9vZFwiLFxuLy8gICAgICBcImNvc3RcIjogMC4wMCxcbi8vICAgICBcInJldmlld1wiOiBcIllvdSBjYW4gZGVmaW5pdGVseSBnZXQgdGhpbmdzIGZvciBhIGxvd2VyIHByaWNlIGlmIHlvdSBhcmUgICAgICAgICAgIHdpbGxpbmcgdG8gYmFyZ2FpbiFcIiB9Il19
