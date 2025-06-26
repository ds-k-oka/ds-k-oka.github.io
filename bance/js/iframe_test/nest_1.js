//const js2path = "http://127.0.0.1:8881/js/iframe_test/nest_2.js";
const js2path = "https://ds-k-oka.github.io/bance/js/iframe_test/nest_2.js";

// 親iframeの中
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";
document.body.style.position = "relative";
document.body.style.width = "468px";
document.body.style.height = "90px";

// midIframe（子）
const midIframe = document.createElement("iframe");
midIframe.width = "468";
midIframe.height = "90";
midIframe.style.position = "absolute";
midIframe.style.top = "0";
midIframe.style.left = "0";
midIframe.style.border = "none";
midIframe.setAttribute("scrolling", "no");
document.body.appendChild(midIframe);

midIframe.onload = () => {
  const midDoc = midIframe.contentDocument;
  midDoc.body.style.margin = "0";
  midDoc.body.style.padding = "0";
  midDoc.body.style.overflow = "hidden";
  midDoc.body.style.position = "relative";

  const innerIframe = midDoc.createElement("iframe");
  innerIframe.width = "468";
  innerIframe.height = "90";
  innerIframe.style.position = "absolute";
  innerIframe.style.top = "0";
  innerIframe.style.left = "0";
  innerIframe.style.border = "none";
  innerIframe.setAttribute("scrolling", "yes");
  midDoc.body.appendChild(innerIframe);

  innerIframe.onload = () => {
    const innerDoc = innerIframe.contentDocument;
    innerDoc.open();
    innerDoc.write(`
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body>
          <script src="${js2path}" defer></script>
        </body>
      </html>
    `);
    innerDoc.close();
  };

  innerIframe.src = "about:blank"; // 必ず最後に設定
};

midIframe.src = "about:blank"; // 同上
