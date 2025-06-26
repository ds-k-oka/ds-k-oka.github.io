// bodyにスクロール強制設定
document.body.style.overflow = "scroll";

// 最小の表示要素
const de = document.createElement("div");
de.innerHTML = `
  <div>
    <a href="https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}">
      リンク：https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}
    </a>
  </div>
`;

document.body.appendChild(de);
