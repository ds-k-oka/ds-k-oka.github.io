const js2path = "https://ds-k-oka.github.io/bance/js/iframe_test/nest_2.js";
//const js2path = "http://127.0.0.1:8881/js/iframe_test/nest_2.js";

const midIframe = document.createElement("iframe");
midIframe.width = "468";
midIframe.height = "90"; // ←この高さ内に収める
midIframe.scrolling = "no";
midIframe.style.border = "none";
document.body.appendChild(midIframe);

midIframe.addEventListener("load", () => {
  const midDoc = midIframe.contentDocument;

  // bodyに相対位置指定
  midDoc.body.style.position = "relative";
  midDoc.body.style.margin = "0";
  midDoc.body.style.padding = "0";
  midDoc.body.style.overflow = "hidden";

  const innerIframe = midDoc.createElement("iframe");
  innerIframe.width = "468";
  innerIframe.height = "90"; // 親と同じ高さ
  innerIframe.scrolling = "yes";
  innerIframe.style.position = "absolute"; // 親iframe内の左上に固定
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

  innerIframe.src = "about:blank";
});

midIframe.src = "about:blank";