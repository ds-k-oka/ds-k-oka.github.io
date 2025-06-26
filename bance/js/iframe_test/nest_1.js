const js2path = "https://ds-k-oka.github.io/bance/js/iframe_test/nest_2.js";
//const js2path = "http://127.0.0.1:8881/js/iframe_test/nest_2.js";
const midIframe = document.createElement("iframe");
midIframe.width = "468";
midIframe.height = "90";
midIframe.style.border = "1px solid gray";
midIframe.scrolling = "yes";
midIframe.style.overflow = "scroll";
document.body.appendChild(midIframe);

// 子iframeが読み込まれた後に処理を実行
midIframe.addEventListener("load", () => {
  const midDoc = midIframe.contentDocument;

  // 孫iframe（最内）の構築
  const innerIframe = midDoc.createElement("iframe");
  innerIframe.width = "468";
  innerIframe.height = "90";
  innerIframe.style.border = "1px solid blue";
  midDoc.body.appendChild(innerIframe);

  // 孫iframe内にHTMLを構築（scriptタグでjs_2.jsを読み込む）
  innerIframe.addEventListener("load", () => {
    const innerDoc = innerIframe.contentDocument;
    const html = innerDoc.documentElement || innerDoc.createElement("html");
    const head = innerDoc.createElement("head");
    const body = innerDoc.createElement("body");

    // クリーンなHTML構造に置き換え
    innerDoc.replaceChild(html, innerDoc.documentElement);
    html.appendChild(head);
    html.appendChild(body);

    // js_2.js を読み込み
    const script = innerDoc.createElement("script");
    script.src = js2path;
    script.defer = true;
    body.appendChild(script);
  });

  // 孫iframeの初期空HTMLをセット（load イベントを発火させるため）
  innerIframe.src = 'about:blank';
});

// 子iframeの初期空HTMLをセット（load イベントを発火させるため）
midIframe.src = 'about:blank';