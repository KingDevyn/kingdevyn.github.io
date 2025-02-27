const GAME_NAME = "HTML5 Portfolio OS";
const GAME_VERSION = "1.0.0.0";

const CACHE_NAME = JSON.stringify({"name": GAME_NAME, "version": GAME_VERSION});
const CACHE_FILES = ["runner.data",
"runner.js",
"runner.wasm",
"audio-worklet.js",
"3-in-1-lantern.mp4",
"amazon-remote-ad.mp4",
"bh-and-g-led-night-light.mp4",
"cc-sale.mp4",
"foldable-lamp.mp4",
"game.unx",
"holiday-card.mp4",
"in-wall-toggle-exploded.mp4",
"notosans-regular.ttf",
"options.ini",
"pop-up-lantern.mp4",
"titan.mp4",
"tv-mount.mp4",
"ultrapro-z-wave.mp4",
"utilitech-coax-cable.mp4"
];

self.addEventListener("fetch", (event) => {
  const should_cache = CACHE_FILES.some((f) => {
      return event.request.url.endsWith(f);
  });
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (should_cache) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.allSettled(
      keys.map((key) => {
        try {
          const data = JSON.parse(key);
          if (data && data["name"] && data.name == GAME_NAME &&
              data.version && data.version != GAME_VERSION) {
            return caches.delete(key);
          }
        } catch {
          return;
        }
      })
    )).then(() => {
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
