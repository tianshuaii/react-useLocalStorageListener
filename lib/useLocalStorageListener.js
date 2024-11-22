"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
function safeParse(jsonString) {
  if (jsonString === null) {
    return null;
  }
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
function useLocalStorageListener(localStorageKey, callback) {
  (0, _react.useEffect)(function () {
    var originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, newValue) {
      var setItemEvent = new CustomEvent("setItemEvent", {
        detail: {
          key: key,
          newValue: newValue
        }
      });
      window.dispatchEvent(setItemEvent);
      originalSetItem.apply(this, [key, newValue]);
    };
    var handleSetItemEvent = function handleSetItemEvent(event) {
      var customEvent = event;
      if (event.detail.key === localStorageKey) {
        // 这里的key就是本地存储对应的key
        var updatedValue = safeParse(customEvent.detail.newValue);
        callback(updatedValue); // 将本地存储最新的值传给回调函数
      }
    };
    window.addEventListener("setItemEvent", handleSetItemEvent);
    return function () {
      window.removeEventListener("setItemEvent", handleSetItemEvent);
      localStorage.setItem = originalSetItem;
    };
  }, [localStorageKey, callback]);
}
var _default = exports["default"] = useLocalStorageListener;