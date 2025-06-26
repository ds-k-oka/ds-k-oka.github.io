const js2path = "https://ds-k-oka.github.io/bance/js/iframe_test/nest_2.js";
//const js2path = "http://127.0.0.1:8881/js/iframe_test/nest_2.js";

const midIframe = document.createElement("iframe");
midIframe.width = "468";
midIframe.height = "120"; // 高さを確保
midIframe.scrolling = "yes"; // 常にスクロールバー表示
document.body.appendChild(midIframe);

midIframe.addEventListener("load", () => {
  const midDoc = midIframe.contentDocument;

  const innerIframe = midDoc.createElement("iframe");
  innerIframe.width = "468";
  innerIframe.height = "100"; // 高さを確保
  innerIframe.scrolling = "yes"; // スクロールバー表示
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

  innerIframe.src = 'about:blank';
});

midIframe.src = 'about:blank';
