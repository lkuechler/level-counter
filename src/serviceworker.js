const cacheName = "duck-lvl-counter";
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
