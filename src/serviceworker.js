const cacheName = "duck-lvl-counter";
const offlineUrl = "/offline.html";
const appShellFiles = [
	"/",
	"/index.css",
	"/index.html",
	"/index.js",
	"/icon/favicon.png",
	"/icon/lvl_icon.png",
	"/icon/original.png",
	"/icon/pwa/apple-icon-180.png",
	"/icon/pwa/apple-splash-640-1136.jpg",
	"/icon/pwa/apple-splash-750-1334.jpg",
	"/icon/pwa/apple-splash-828-1792.jpg",
	"/icon/pwa/apple-splash-1125-2436.jpg",
	"/icon/pwa/apple-splash-1136-640.jpg",
	"/icon/pwa/apple-splash-1170-2532.jpg",
	"/icon/pwa/apple-splash-1179-2556.jpg",
	"/icon/pwa/apple-splash-1242-2208.jpg",
	"/icon/pwa/apple-splash-1242-2688.jpg",
	"/icon/pwa/apple-splash-1284-2778.jpg",
	"/icon/pwa/apple-splash-1290-2796.jpg",
	"/icon/pwa/apple-splash-1334-750.jpg",
	"/icon/pwa/apple-splash-1536-2048.jpg",
	"/icon/pwa/apple-splash-1620-2160.jpg",
	"/icon/pwa/apple-splash-1668-2224.jpg",
	"/icon/pwa/apple-splash-1668-2388.jpg",
	"/icon/pwa/apple-splash-1792-828.jpg",
	"/icon/pwa/apple-splash-2048-1536.jpg",
	"/icon/pwa/apple-splash-2048-2732.jpg",
	"/icon/pwa/apple-splash-2160-1620.jpg",
	"/icon/pwa/apple-splash-2208-1242.jpg",
	"/icon/pwa/apple-splash-2224-1668.jpg",
	"/icon/pwa/apple-splash-2388-1668.jpg",
	"/icon/pwa/apple-splash-2436-1125.jpg",
	"/icon/pwa/apple-splash-2532-1170.jpg",
	"/icon/pwa/apple-splash-2556-1179.jpg",
	"/icon/pwa/apple-splash-2688-1242.jpg",
	"/icon/pwa/apple-splash-2732-2048.jpg",
	"/icon/pwa/apple-splash-2778-1284.jpg",
	"/icon/pwa/apple-splash-2796-1290.jpg",
	"/icon/pwa/favicon-196.png",
	"/icon/pwa/manifest-icon-192.maskable.png",
	"/icon/pwa/manifest-icon-512.maskable.png",
	offlineUrl,
];

self.addEventListener("install", (e) => {
	console.log("[Service Worker] Install");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			console.log("[Service Worker] Caching all: app shell and content");
			await cache.addAll(appShellFiles);
		})()
	);
});

// only included to avoid errors in lighthouse
self.addEventListener("fetch", (event) => {
	// We only want to call event.respondWith() if this is a navigation request
	// for an HTML page.
	if (event.request.mode === "navigate") {
		event.respondWith(
			(async () => {
				try {
					// First, try to use the navigation preload response if it's supported.
					const preloadResponse = await event.preloadResponse;
					if (preloadResponse) {
						return preloadResponse;
					}

					const networkResponse = await fetch(event.request);
					return networkResponse;
				} catch (error) {
					// catch is only triggered if an exception is thrown, which is likely
					// due to a network error.
					// If fetch() returns a valid HTTP response with a response code in
					// the 4xx or 5xx range, the catch() will NOT be called.
					console.log(
						"Fetch failed; returning offline page instead.",
						error
					);

					const cache = await caches.open(CACHE_NAME);
					const cachedResponse = await cache.match(OFFLINE_URL);
					return cachedResponse;
				}
			})()
		);
	}
});
