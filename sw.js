// 旧方式（iOS 16.4〜18.3）用の受け手。新方式の端末では使われない
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}
  const n = data.notification || {};
  event.waitUntil(self.registration.showNotification(n.title || '通知テスト', {
    body: n.body || '',
    data: { url: n.navigate || './' },
  }));
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
