// 埋め込み内容
const de = document.createElement("div");
de.innerHTML = `
  <div>
  <a href="https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}">リンク：https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}</a>
  </div>
`;

document.body.appendChild(de);
