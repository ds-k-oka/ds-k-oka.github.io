const tweetContainer = document.createElement("div");
tweetContainer.innerHTML = `
  <blockquote class="twitter-tweet">
    <p lang="ja" dir="ltr">
      アメリカへフェンタニルを密輸する名古屋の中継拠点を管理していた中国人について<br><br>
      ･沖縄県那覇市在住<br><br>
      ･米国にフェンタニル原料密輸、マネロンで起訴された武漢のアマーベルバイオテック(湖北精奥生物科技)の主要人物の１人。<br><br>
      ･名古屋にFrisky…
      <a href="https://t.co/SHNYkE24HF">https://t.co/SHNYkE24HF</a>
      <a href="https://t.co/lYoHaRZnFS">pic.twitter.com/lYoHaRZnFS</a>
    </p>&mdash; mei (@2022meimei3)
    <a href="https://twitter.com/2022meimei3/status/1938039568986755529?ref_src=twsrc%5Etfw">June 26, 2025</a>
  </blockquote>
  <a href="https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}">リンク：https://www.dimage.co.jp/?link={BNC_TAG_CLICK_URL_ENC}</a>
`;

document.body.appendChild(tweetContainer);

// Twitter埋め込みscriptを追加
const twitterScript = document.createElement("script");
twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
twitterScript.setAttribute("charset", "utf-8");
document.body.appendChild(twitterScript);
