const CACHE = 'hyele-app-v70';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon-180.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// 화면(HTML)은 네트워크 우선: 열 때마다 최신 화면, 3초 안에 안 오면 저장본으로 먼저 띄움(오프라인 대비)
function pageFirst(req, url) {
  const key = url.origin + url.pathname;
  return new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const fromCache = () => caches.match(key).then(r => r || caches.match('./index.html'));
    const timer = setTimeout(() => fromCache().then(finish), 3000);
    fetch(url.href, { cache: 'no-cache', credentials: 'same-origin' }).then(res => {
      clearTimeout(timer);
      if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(key, cp)); }
      finish(res);
    }).catch(() => {
      clearTimeout(timer);
      fromCache().then(r => { finish(r || Response.error()); });
    });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // 신청 제출(POST) 등은 그대로 통과
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;       // 외부 링크는 캐시하지 않음
  if (req.mode === 'navigate' || /\/$|\.html$/.test(url.pathname)) {
    e.respondWith(pageFirst(req, url));
    return;
  }
  // 이미지·아이콘 등은 저장본 우선(빠르게)
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res;
    }).catch(() => caches.match('./index.html')))
  );
});
