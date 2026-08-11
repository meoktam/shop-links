(function () {
  const config = window.SHOP_LINKS || {};
  const products = Array.isArray(config.products) ? config.products : [];
  const list = document.querySelector("#product-list");

  function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    const embed = document.createElement("div");
    embed.className = "product-media";
    const parsedHtml = parseProductHtml(product.embedHtml || "");
    const imageUrl = product.imageUrl || parsedHtml.imageUrl;
    const productUrl = getAllowedProductUrl(product.href || product.url || "") || parsedHtml.linkUrl;

    if (imageUrl) {
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = product.productName || product.title || "상품 이미지";
      image.loading = "lazy";
      embed.append(image);
    } else if (parsedHtml.iframe) {
      embed.append(parsedHtml.iframe);
    } else {
      embed.textContent = "쿠팡 HTML 링크를 입력해주세요.";
      embed.classList.add("product-media--invalid");
    }

    const copy = document.createElement("div");
    copy.className = "product-copy";

    const title = document.createElement("p");
    title.className = "content-title";
    title.textContent = product.title || "추천 상품";

    const productName = document.createElement("h2");
    productName.className = "product-name";
    productName.textContent = product.productName || "상품명을 입력해주세요";

    copy.append(title, productName);
    article.append(embed, copy);

    if (productUrl) {
      article.classList.add("product-card--linked");
      const link = document.createElement("a");
      link.className = "product-hit-area";
      link.href = productUrl;
      link.target = "_blank";
      link.rel = "noopener sponsored";
      link.referrerPolicy = "unsafe-url";
      link.setAttribute("aria-label", `${product.productName || product.title || "상품"} 보러가기`);
      article.append(link);
    }

    return article;
  }

  function parseProductHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const link = doc.querySelector("a[href]");
    const image = doc.querySelector("img[src]");
    const iframe = doc.querySelector("iframe");

    return {
      iframe: iframe ? createSafeIframe(iframe) : null,
      imageUrl: image ? normalizeImageUrl(image.getAttribute("src") || "") : "",
      linkUrl: getAllowedProductUrl(link?.getAttribute("href") || iframe?.getAttribute("src") || "")
    };
  }

  function createSafeIframe(iframe) {
    const src = iframe.getAttribute("src") || "";
    if (!getAllowedProductUrl(src)) return null;

    const safeIframe = document.createElement("iframe");
    safeIframe.src = src;
    safeIframe.width = iframe.getAttribute("width") || "120";
    safeIframe.height = iframe.getAttribute("height") || "240";
    safeIframe.loading = "lazy";
    safeIframe.referrerPolicy = iframe.getAttribute("referrerpolicy") || "unsafe-url";
    safeIframe.setAttribute("frameborder", iframe.getAttribute("frameborder") || "0");
    safeIframe.setAttribute("scrolling", iframe.getAttribute("scrolling") || "no");
    safeIframe.setAttribute("title", productIframeTitle(src));
    if (iframe.hasAttribute("browsingtopics")) {
      safeIframe.setAttribute("browsingtopics", "");
    }
    return safeIframe;
  }

  function getAllowedProductUrl(value) {
    try {
      const url = new URL(value);
      const allowedHosts = ["coupa.ng", "link.coupang.com"];
      const isAllowed = allowedHosts.includes(url.hostname) || url.hostname.endsWith(".coupang.com");
      return url.protocol === "https:" && isAllowed ? url.href : "";
    } catch {
      return "";
    }
  }

  function normalizeImageUrl(value) {
    if (!value) return "";
    try {
      return new URL(value, window.location.href).href;
    } catch {
      return "";
    }
  }

  function productIframeTitle(src) {
    return `쿠팡 파트너스 상품 링크 ${src}`;
  }

  list.replaceChildren(...products.map(createProductCard));
})();
