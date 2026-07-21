const CACHE = 'hyele-app-v24';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon-180.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                 // 구글폼 제출(POST) 등은 그대로 통과
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;       // 외부 링크는 캐시하지 않음
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res;
    }).catch(() => caches.match('./index.html')))
  );
});
