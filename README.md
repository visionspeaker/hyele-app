# 한양전공(주) 임직원 앱 — 배포 안내

직원들이 휴대폰 홈 화면에 "앱처럼" 추가해서 쓸 수 있도록, GitHub Pages(무료 웹호스팅)로 배포하는 방법입니다. PWA(설치형 웹앱)로 구성되어 있어 별도 앱스토어 등록 없이 링크만 공유하면 됩니다.

## 폴더 구성
- `index.html` — 앱 본체
- `manifest.webmanifest` — 앱 이름·아이콘·색상 정의(설치용)
- `sw.js` — 서비스워커(오프라인 캐시·설치 지원)
- `icon-192.png`, `icon-512.png` — 안드로이드/공용 앱 아이콘
- `apple-touch-icon-180.png` — 아이폰 홈 화면 아이콘

## GitHub Pages로 올리기 (웹브라우저만으로 가능)
1. https://github.com 로그인 → 오른쪽 위 `+` → **New repository**.
2. 저장소 이름 입력(예: `hyele-app`) → **Public** 선택 → **Create repository**.
3. 새 저장소 화면에서 **uploading an existing file** 클릭.
4. 이 폴더 안의 **모든 파일**(index.html, manifest.webmanifest, sw.js, 아이콘 4개)을 드래그해서 올리고 **Commit changes**.
5. 상단 **Settings → Pages** 이동.
6. **Build and deployment → Source**를 **Deploy from a branch**로, **Branch**를 `main` / `/(root)`로 지정 → **Save**.
7. 1~2분 뒤 같은 화면에 접속 주소가 뜹니다: `https://<아이디>.github.io/hyele-app/`
   - 이 주소가 곧 앱 주소입니다.

## 직원에게 배포
- 위 주소를 사내 공지/문자/카톡으로 공유합니다.
- **아이폰(Safari)**: 주소 접속 → 하단 공유 버튼 → **홈 화면에 추가**.
- **안드로이드(Chrome)**: 주소 접속 → 우측 상단 메뉴(⋮) → **앱 설치** 또는 **홈 화면에 추가**.
- 추가하면 홈 화면에 한양전공 아이콘이 생기고, 실행 시 주소창 없이 전체화면 앱처럼 열립니다.

## 내용 수정할 때
- `index.html`만 고쳐서 저장소에 다시 업로드(같은 파일명 덮어쓰기)하면 됩니다.
- 캐시 때문에 바로 안 바뀌면 `sw.js`의 `hyele-app-v1`을 `v2`로 바꿔 함께 올리면 갱신됩니다.

## 참고
- 구글폼 기반 메뉴(증명서·석식·명함·근무복·아차사고·안전용품)는 앱 안에서 입력한 값이 기존 구글 스프레드시트로 그대로 저장됩니다. 배포 후 각 폼을 한 번씩 시험 제출해 정상 적재를 확인하세요.
- GitHub Pages는 HTTPS로 제공되어 설치·서비스워커가 정상 동작합니다.
