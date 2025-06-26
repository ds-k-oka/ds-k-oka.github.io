//const js2path = "http://127.0.0.1:8881/js/iframe_test/nest_2.js";
const js2path = "https://ds-k-oka.github.io/bance/js/iframe_test/nest_2.js";

// 1. 親iframeのbodyを制御
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";
document.body.style.position = "relative";   // ←ここが重要
document.body.style.width = "468px";
document.body.style.height = "90px";         // ←この中に収める

// 2. midIframe（子）を追加、絶対位置で上詰め
const midIframe = document.createElement("iframe");
midIframe.width = "468";
midIframe.height = "90";
midIframe.scrolling = "no";
midIframe.src = "about:blank";
midIframe.style.position = "absolute";       // ←親body内の上詰め
midIframe.style.top = "0";
midIframe.style.left = "0";
midIframe.style.border = "none";
document.body.appendChild(midIframe);

// 3. midIframe内に innerIframe を配置（孫iframe）
midIframe.addEventListener("load", () => {
  const midDoc = midIframe.contentDocument;
  midDoc.body.style.margin = "0";
  midDoc.body.style.padding = "0";
  midDoc.body.style.overflow = "hidden";
  midDoc.body.style.position = "relative";

  const innerIframe = midDoc.createElement("iframe");
  innerIframe.width = "468";
  innerIframe.height = "90";
  innerIframe.scrolling = "yes";
  innerIframe.src = "about:blank";
  innerIframe.style.position = "absolute";
  innerIframe.style.top = "0";
  innerIframe.style.left = "0";
  innerIframe.style.border = "none";
  midDoc.body.appendChild(innerIframe);

  innerIframe.addEventListener("load", () => {
    const innerDoc = innerIframe.contentDocument;
    const html = innerDoc.createElement("html");
    const head = innerDoc.createElement("head");
    const body = innerDoc.createElement("body");

    innerDoc.replaceChild(html, innerDoc.documentElement);
    html.appendChild(head);
    html.appendChild(body);

    const script = innerDoc.createElement("script");
    script.src = js2path;
    script.defer = true;
    body.appendChild(script);
  });
});
