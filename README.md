# shop-links

쿠팡 파트너스 링크를 모아 보여주는 GitHub Pages용 정적 링크 페이지입니다.

## 파일 구조

- `index.html`: 페이지 기본 구조
- `styles.css`: 화면 디자인
- `products.js`: 상품 링크 데이터
- `app.js`: 상품 카드 렌더링
- `assets/shop_link_title.png`: 상단 타이틀 이미지
- `.nojekyll`: GitHub Pages가 정적 파일을 그대로 배포하도록 하는 파일

## 상품 추가 방법

`products.js`의 `products` 배열에 항목을 추가합니다.

상품 링크:

```js
{
  id: "unique-id",
  title: "SNS에서 난리난 10분 끓여먹는 라면",
  productName: "농심 멸치 칼국수",
  imageUrl: "https://example.com/product-image.jpg",
  embedHtml: "<iframe src=\"https://coupa.ng/xxxxxx\" width=\"120\" height=\"240\" frameborder=\"0\" scrolling=\"no\" referrerpolicy=\"unsafe-url\" browsingtopics></iframe>"
}
```

`imageUrl`은 선택 사항입니다. 넣으면 카드 왼쪽 원형 썸네일에 이미지가 표시되고, 없으면 쿠팡 iframe이 표시됩니다.

쿠팡 HTML 안에 `<img>`가 포함되어 있으면 이미지 주소를 자동으로 분리해서 썸네일로 사용합니다. `<iframe>`만 있는 HTML은 브라우저 보안상 iframe 안의 이미지를 직접 분리할 수 없어서 `imageUrl`을 따로 넣어주세요.

## GitHub Pages 설정

1. GitHub 저장소에서 `Settings`로 이동합니다.
2. 왼쪽 메뉴에서 `Pages`를 엽니다.
3. `Build and deployment`의 `Source`를 `Deploy from a branch`로 선택합니다.
4. Branch는 `main`, Folder는 `/root`로 선택합니다.
5. `Save`를 누릅니다.

배포가 완료되면 보통 아래 주소에서 볼 수 있습니다.

```text
https://meoktam.github.io/shop-links/
```
