"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // src/utils/ascii-number.js
  var _getDigitsMap, getDigitsMap_fn;
  var _AsciiNumber = class _AsciiNumber {
    static toString(num) {
      let negative = num < 0;
      let str = [];
      if (!negative)
        num = -num;
      while (num <= -this.radix) {
        str.unshift(this.digits[-parseInt(num % this.radix)]);
        num = num / this.radix;
      }
      str.unshift(this.digits[-parseInt(num)]);
      if (negative)
        str.unshift("-");
      let res = str.join("");
      return !res ? "0" : res;
    }
    static toLong(s) {
      if (!s || s.length == 0)
        return 0;
      const digitsMap = __privateMethod(this, _getDigitsMap, getDigitsMap_fn).call(this);
      let result = 0;
      let negative = s[0] == "-";
      const validateDigits = (s2) => {
        for (let i = negative ? 1 : 0, max = s2.length; i < max; i++) {
          if (digitsMap[s2[i]] == null || digitsMap[s2[i]] == void 0) {
            return false;
          }
        }
        return true;
      };
      if (!validateDigits(s)) {
        return 0;
      }
      for (let i = negative ? 1 : 0, max = s.length; i < max; i++) {
        if (s[i] < "0" || s[i] > "z") {
          if (result > 0)
            break;
          continue;
        }
        result *= this.radix;
        result += digitsMap[s[i]];
      }
      return parseInt(negative ? -result : result);
    }
  };
  _getDigitsMap = new WeakSet();
  getDigitsMap_fn = function() {
    let conv = [];
    for (const index in Object.keys(this.digits)) {
      conv[this.digits[index]] = parseInt(index);
    }
    return conv;
  };
  __privateAdd(_AsciiNumber, _getDigitsMap);
  __publicField(_AsciiNumber, "digits", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  __publicField(_AsciiNumber, "radix", _AsciiNumber.digits.length);
  var AsciiNumber = _AsciiNumber;

  // src/common/uid.js
  var _config_id, _getRandomIntInclusive, getRandomIntInclusive_fn, _hash, hash_fn;
  var Uid = class {
    constructor(config_id) {
      __privateAdd(this, _getRandomIntInclusive);
      __privateAdd(this, _hash);
      __privateAdd(this, _config_id, void 0);
      __privateSet(this, _config_id, String(config_id));
      ;
    }
    createUid() {
      const rand = AsciiNumber.toString(__privateMethod(this, _getRandomIntInclusive, getRandomIntInclusive_fn).call(this, 0, 2e5)).padStart(3, 0);
      return "".concat(__privateMethod(this, _hash, hash_fn).call(this, __privateGet(this, _config_id)), "-").concat(rand).concat(AsciiNumber.toString(Date.now()));
    }
  };
  _config_id = new WeakMap();
  _getRandomIntInclusive = new WeakSet();
  getRandomIntInclusive_fn = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  _hash = new WeakSet();
  hash_fn = function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
    }
    return new Uint16Array([hash])[0].toString(36);
  };

  // src/common/cookie.js
  var _expire;
  var Cookie = class {
    constructor() {
      __publicField(this, "Key", Object.freeze({
        PFPUID: "__bnc_pfpuid__"
      }));
      __privateAdd(this, _expire, 60 * 60 * 24 * 7);
    }
    get(key) {
      const cookies = document.cookie;
      if (!cookies) {
        return null;
      }
      const cookieArray = cookies.split(";");
      for (const cookieString of cookieArray) {
        if (cookieString.trim().startsWith(key + "=")) {
          return decodeURIComponent(cookieString.split("=")[1]);
        }
      }
      return null;
    }
    set(key, value, expire) {
      const str = key + "=" + encodeURIComponent(value) + "; max-age=" + (expire == null ? __privateGet(this, _expire) : expire) + "; path=/";
      document.cookie = str;
    }
  };
  _expire = new WeakMap();

  // src/utils/fetch-with-timeout.js
  function fetchWithTimeout(url, timeoutMilliseconds, options = {}) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeoutMilliseconds);
    return fetch(url, __spreadProps(__spreadValues({}, options), { signal: controller.signal })).then((response) => {
      clearTimeout(timerId);
      if (response.ok) {
        return response;
      } else {
        throw new Error("Invalid Response: ".concat(response.status));
      }
    }).catch((error) => {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Fetch timeout");
      }
      throw error;
    });
  }

  // src/requests/ad-api-request.js
  var _endpoint, _timeoutMs;
  var AdApiRequest = class {
    constructor() {
      __privateAdd(this, _endpoint, "https://bid.ssp.stg.bance.admage.jp/ssp-bid/bid/bnc-bid");
      __privateAdd(this, _timeoutMs, 1e3);
    }
    getAd(payload) {
      const options = {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "text/plain"
          // XXX: preflightが発生しなければjsonでも可　確認後対応
        }
      };
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value !== null)
      );
      const url = __privateGet(this, _endpoint) + "?" + new URLSearchParams(filteredPayload);
      return fetchWithTimeout(url, __privateGet(this, _timeoutMs), options);
    }
  };
  _endpoint = new WeakMap();
  _timeoutMs = new WeakMap();

  // src/utils/browser.js
  function getLocation(win) {
    const doc = win.document;
    let loc = doc.location.href || "";
    var ref = doc.referrer || "";
    if (win.top === win.self)
      return loc;
    try {
      loc = win.top.location.href;
      ref = win.top.document.referrer;
    } catch (e) {
      try {
        if (win.frameElement && !win.frameElement.src) {
          ref = "";
        } else if (ref) {
          loc = ref;
        }
      } catch (e2) {
        loc = ref || "";
      }
    }
    return loc;
  }

  // src/utils/retry-with-delay.js
  var wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function retryWithDelay(fn, delay, retries) {
    return new Promise((resolve, reject) => {
      return fn().then(resolve).catch((reason) => {
        if (retries > 0) {
          return wait(delay).then(() => retryWithDelay(fn, delay, retries - 1)).then(resolve).catch(reject);
        }
        return reject(reason);
      });
    });
  }

  // src/utils/tag-converter.js
  function toDomArr(tag) {
    const tmp = document.createElement("tmp");
    tmp.innerHTML = tag;
    const arr = Array.from(tmp.querySelectorAll("script"));
    if (arr.length > 0) {
      arr.forEach((elemHtml) => {
        const elemScript = document.createElement("script");
        Array.from(elemHtml.attributes).forEach((attr) => elemScript.setAttribute(attr.name, attr.value));
        elemScript.appendChild(document.createTextNode(elemHtml.innerHTML));
        elemHtml.parentNode.replaceChild(elemScript, elemHtml);
      });
    }
    return Array.from(tmp.childNodes);
  }

  // src/ad-manager.js
  var wait2 = (ms) => new Promise((r) => setTimeout(r, ms));
  var _doc, _zoneElementId, _adData, _adIframe, _createAdIframeHtml, createAdIframeHtml_fn, _createUUID, createUUID_fn, _applyAd, applyAd_fn, _checkContainsTagInIframe, checkContainsTagInIframe_fn;
  var AdManager = class {
    /**
     *
     * @param {Document} doc
     * @param {string} zoneElementId
     * @param {JSON} adData
     */
    constructor(doc, zoneElementId, adData) {
      /**
       *
       * @returns {HTMLIFrameElement}
       */
      __privateAdd(this, _createAdIframeHtml);
      __privateAdd(this, _createUUID);
      __privateAdd(this, _applyAd);
      __privateAdd(this, _checkContainsTagInIframe);
      __publicField(this, "AdType", Object.freeze({
        BANNER: 1,
        TAG: 2,
        VIDEO: 99
      }));
      __privateAdd(this, _doc, void 0);
      __privateAdd(this, _zoneElementId, void 0);
      __privateAdd(this, _adData, void 0);
      __privateAdd(this, _adIframe, void 0);
      __privateSet(this, _doc, doc);
      __privateSet(this, _adData, adData);
      __privateSet(this, _zoneElementId, zoneElementId + __privateMethod(this, _createUUID, createUUID_fn).call(this));
      const el = __privateGet(this, _doc).getElementById(zoneElementId);
      el.id = __privateGet(this, _zoneElementId);
    }
    /**
     * @returns {void}
     */
    initializeZone() {
      const zoneElem = __privateGet(this, _doc).getElementById(__privateGet(this, _zoneElementId));
      const zoneData = __privateGet(this, _adData).zone;
      const adFrameId = __privateGet(this, _zoneElementId) + "_iframe";
      const zoneHtml = (zoneData.p || "") + __privateMethod(this, _createAdIframeHtml, createAdIframeHtml_fn).call(this, adFrameId, zoneData) + (zoneData.a || "") + (__privateGet(this, _adData).cs || "");
      toDomArr(zoneHtml).forEach((node) => zoneElem.appendChild(node));
      __privateSet(this, _adIframe, __privateGet(this, _doc).getElementById(adFrameId));
    }
    async applyAd() {
      return retryWithDelay(__privateMethod(this, _applyAd, applyAd_fn).bind(this), 0, __privateGet(this, _adData).ads.length - 1 || 0);
    }
  };
  _doc = new WeakMap();
  _zoneElementId = new WeakMap();
  _adData = new WeakMap();
  _adIframe = new WeakMap();
  _createAdIframeHtml = new WeakSet();
  createAdIframeHtml_fn = function(adFrameId, zoneData) {
    return '<iframe id="'.concat(adFrameId, '" width="').concat(zoneData.w, '" height="').concat(zoneData.h, '" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" srcdoc="<!DOCTYPE html><html><head><meta charset=\'utf-8\'></head><body></body></html>" style="overflow: hidden; border: 0; margin: 0 auto; width: ').concat(zoneData.w, "; height: ").concat(zoneData.h, ';"></iframe>');
  };
  _createUUID = new WeakSet();
  createUUID_fn = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  };
  _applyAd = new WeakSet();
  applyAd_fn = async function() {
    const adIframe = __privateGet(this, _adIframe);
    const ad = __privateGet(this, _adData).ads.shift();
    if (ad == null)
      return;
    switch (ad.type) {
      case this.AdType.BANNER:
      case this.AdType.TAG:
        const iframeDoc = adIframe.contentDocument;
        iframeDoc.open();
        iframeDoc.write("<html><body>".concat(ad.tag, "</body></html>"));
        iframeDoc.close();
        break;
      case this.AdType.VIDEO:
        adIframe.srcdoc = '<script async src="'.concat(ad.pjs, '"><\/script>');
        adIframe.onload = () => {
          const adIframeWindow = adIframe.contentWindow;
          adIframeWindow.bncvp = adIframeWindow.bncvp || { cmd: [] };
          adIframeWindow.bncvp.cmd.push(function() {
            adIframeWindow.bncvp.publish(ad);
          });
        };
        break;
      default:
        break;
    }
    return wait2(1e3).then(() => {
      if (!__privateMethod(this, _checkContainsTagInIframe, checkContainsTagInIframe_fn).call(this, adIframe)) {
        throw new Error("The deployment of the ad tag could not be verified.");
      }
    });
  };
  _checkContainsTagInIframe = new WeakSet();
  checkContainsTagInIframe_fn = function(iframe) {
    return iframe.contentDocument.querySelector("A, IFRAME") !== null;
  };

  // src/requests/im-uid-api-request.js
  var _sdkUrl, _customerId, _timeoutMs2;
  var _ImUidApiRequest = class _ImUidApiRequest {
    constructor() {
      __privateAdd(this, _sdkUrl, "https://dmp.im-apps.net/sdk/im-uid.js");
      __privateAdd(this, _customerId, 0);
      __privateAdd(this, _timeoutMs2, 1e3);
    }
    loadScript(callback) {
      if (_ImUidApiRequest.scriptLoaded) {
        callback(null);
        return;
      }
      const script = document.createElement("script");
      script.async = true;
      script.src = __privateGet(this, _sdkUrl);
      script.onload = () => {
        _ImUidApiRequest.scriptLoaded = true;
        callback(null);
      };
      script.onerror = () => callback(new Error("Failed to load imuid sdk script"));
      document.head.appendChild(script);
    }
    getImUid(callback) {
      this.loadScript((error) => {
        if (error) {
          callback(error, null);
          return;
        }
        window.IMUIDRequest = window.IMUIDRequest || [];
        window.IMUIDRequest.push({
          customerId: __privateGet(this, _customerId),
          callback: (res) => {
            if (res.uid) {
              callback(null, res.uid);
            } else {
              callback(null, "");
            }
          },
          callbackTimeout: __privateGet(this, _timeoutMs2)
        });
      });
    }
  };
  _sdkUrl = new WeakMap();
  _customerId = new WeakMap();
  _timeoutMs2 = new WeakMap();
  __publicField(_ImUidApiRequest, "scriptLoaded", false);
  var ImUidApiRequest = _ImUidApiRequest;

  // src/zone-tag.js
  var _config, _cookie, _createPfUid, createPfUid_fn;
  var ZoneTag = class {
    constructor() {
      __privateAdd(this, _createPfUid);
      __publicField(this, "ConfigKey", Object.freeze({
        PID: "pid"
      }));
      // private
      __privateAdd(this, _config, void 0);
      __privateAdd(this, _cookie, void 0);
      // public
      __publicField(this, "cmd");
      this.cmd = [];
      this.cmd.push = (fn) => fn();
      __privateSet(this, _cookie, new Cookie());
    }
    config(config) {
      __privateSet(this, _config, config);
      __privateMethod(this, _createPfUid, createPfUid_fn).call(this);
    }
    publish(zoneId, zoneElementId) {
      const win = globalThis;
      const doc = win.document;
      var payload = {
        /** publisher-id */
        pid: __privateGet(this, _config)[this.ConfigKey.PID],
        /** publisher-1st-party-cookie-uid */
        pfpuid: __privateGet(this, _cookie).get(__privateGet(this, _cookie).Key.PFPUID),
        /** zone-id */
        zid: zoneId,
        /** location.href */
        loc: getLocation(win),
        /** im-uid */
        imuid: null,
        /** document.charset */
        charset: doc.characterSet
      };
      new ImUidApiRequest().getImUid((error, imuid) => {
        if (error) {
          imuid = "";
        }
        payload.imuid = imuid;
        new AdApiRequest().getAd(payload).then((res) => res.json()).then((json) => {
          const adManager = new AdManager(doc, zoneElementId, json);
          adManager.initializeZone();
          adManager.applyAd().catch((e) => void 0);
        }).catch((e) => void 0);
      });
    }
  };
  _config = new WeakMap();
  _cookie = new WeakMap();
  _createPfUid = new WeakSet();
  createPfUid_fn = function() {
    if (!__privateGet(this, _config)[this.ConfigKey.PID])
      return;
    const pfpuid = __privateGet(this, _cookie).get(__privateGet(this, _cookie).Key.PFPUID);
    if (!pfpuid)
      __privateGet(this, _cookie).set(__privateGet(this, _cookie).Key.PFPUID, new Uid(__privateGet(this, _config)[this.ConfigKey.PID]).createUid());
  };

  // src/app.js
  (async () => {
    if (false) {
      if (globalThis.mock_msw_loaded)
        return;
      try {
        const module = await null;
        const worker = module.worker;
        await worker.start({
          onUnhandledRequest: "bypass"
        });
        globalThis.mock_msw = worker;
        globalThis.mock_msw_loaded = true;
      } catch (error) {
      }
    }
    const cmd = globalThis.bnctag ? globalThis.bnctag.cmd : [];
    globalThis.bnctag = new ZoneTag();
    for (const command of cmd) {
      command();
    }
  })();
})();
